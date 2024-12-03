const { Pool } = require('pg');

const pool = new Pool({
    user: 'sshriv21',
    host: 'localhost',
    database: 'property_management',
    password: '',
    port: 8888,
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