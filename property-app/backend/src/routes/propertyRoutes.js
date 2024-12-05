const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Get all properties
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT p.*, pd.numbedroom, pd.numbathroom 
            FROM property p
            LEFT JOIN propertydetails pd ON p.propertyid = pd.property_propertyid
            ORDER BY p.propertyid DESC
        `);
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
        const { propertyid, address, price, ownerid } = req.body;
        const result = await pool.query(
            'INSERT INTO property (propertyid, address, price, ownerid) VALUES ($1, $2, $3, $4) RETURNING *',
            [propertyid, address, price, ownerid]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;