const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Get all owners
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM owner');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Get owner by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM owner WHERE ownerid = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new owner
router.post('/', async (req, res) => {
    try {
        const { ownerid, ownername, email } = req.body;
        const result = await pool.query(
            'INSERT INTO owner (ownerid, ownername, email) VALUES ($1, $2, $3) RETURNING *',
            [ownerid, ownername, email]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;

