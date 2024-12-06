const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Get all properties
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM property');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get property by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM property WHERE propertyid = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new property
router.post('/', async (req, res) => {
    try {
        const { propertyid, address, price, ownerid, numbedroom, numbathroom } = req.body;
        
        // Add property to property table
        const propertyResult = await pool.query(
            'INSERT INTO property (propertyid, address, price, ownerid) VALUES ($1, $2, $3, $4) RETURNING *',
            [propertyid, address, price, ownerid]
        );

        // Add property details to propertydetails table
        const propertyDetailsResult = await pool.query(
            'INSERT INTO propertydetails (property_propertyid, numbedroom, numbathroom) VALUES ($1, $2, $3) RETURNING *',
            [propertyid, numbedroom, numbathroom]
        );

        res.json({ ...propertyResult.rows[0], ...propertyDetailsResult.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update property
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { propertyid, address, price, numbedroom, numbathroom } = req.body;

        // Update property information
        const propertyResult = await pool.query(
            'UPDATE property SET propertyid = $1, address = $2, price = $3 WHERE propertyid = $4 RETURNING *',
            [propertyid, address, price, id]
        );

        // Update property details
        const propertyDetailsResult = await pool.query(
            'UPDATE propertydetails SET numbedroom = $1, numbathroom = $2 WHERE property_propertyid = $3 RETURNING *',
            [numbedroom, numbathroom, id]
        );

        res.json({ ...propertyResult.rows[0], ...propertyDetailsResult.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete property
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Delete property details
        await pool.query('DELETE FROM propertydetails WHERE property_propertyid = $1', [id]);

        // Delete property
        const result = await pool.query('DELETE FROM property WHERE propertyid = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Property not found' });
        }

        res.json({ message: 'Property deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
