const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Get all renters
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM renter');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get renter by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM renter WHERE renterid = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new renter
router.post('/', async (req, res) => {
    try {
        const { renterid, rentername, email, propertyid } = req.body;
        const result = await pool.query(
            'INSERT INTO renter (renterid, rentername, email, propertyid) VALUES ($1, $2, $3, $4) RETURNING *',
            [renterid, rentername, email, propertyid]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'DELETE FROM renter WHERE renterid = $1 RETURNING *',
            [id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Renter not found' });
        }
        
        res.json({ message: 'Renter deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;