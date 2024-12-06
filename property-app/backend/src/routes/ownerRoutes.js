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

// Get owner's properties
router.get('/:id/properties', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `SELECT p.*, pd.numbathroom, pd.numbedroom 
             FROM property p 
             LEFT JOIN propertydetails pd ON p.propertyid = pd.property_propertyid 
             WHERE p.ownerid = $1`,
            [id]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update owner
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { ownerid, ownername, email } = req.body;
        
        const result = await pool.query(
            'UPDATE owner SET ownerid = $1, ownername = $2, email = $3 WHERE ownerid = $4 RETURNING *',
            [ownerid, ownername, email, id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Owner not found' });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get owner by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM owner WHERE ownerid = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Owner not found' });
        }
        
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

// Delete owner
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Check if owner has any properties
        const propertyCheck = await pool.query(
            'SELECT COUNT(*) FROM property WHERE ownerid = $1',
            [id]
        );
        
        if (propertyCheck.rows[0].count > 0) {
            return res.status(400).json({
                error: 'Cannot delete owner with existing properties'
            });
        }
        
        const result = await pool.query(
            'DELETE FROM owner WHERE ownerid = $1 RETURNING *',
            [id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Owner not found' });
        }
        
        res.json({ message: 'Owner deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;