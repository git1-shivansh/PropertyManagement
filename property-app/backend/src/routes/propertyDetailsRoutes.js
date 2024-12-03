const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Get all property details
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM propertydetails');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get property details by property ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'SELECT * FROM propertydetails WHERE property_propertyid = $1',
            [id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add property details
router.post('/', async (req, res) => {
    try {
        const { property_propertyid, numbathroom, numbedroom } = req.body;
        const result = await pool.query(
            'INSERT INTO propertydetails (property_propertyid, numbathroom, numbedroom) VALUES ($1, $2, $3) RETURNING *',
            [property_propertyid, numbathroom, numbedroom]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;