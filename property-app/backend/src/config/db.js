const { Pool } = require('pg');

const pool = new Pool({
    user: 'jonathantang',
    host: 'localhost',
    database: 'property_management',
    password: '#Sweet1112',
    port: 5432,
});

// Test the connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Database connected successfully');
    }
});

module.exports = pool;