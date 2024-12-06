const express = require('express');
const cors = require('cors');

// Import routes
const propertyRoutes = require('./routes/propertyRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const renterRoutes = require('./routes/renterRoutes');
const propertyDetailsRoutes = require('./routes/propertyDetailsRoutes');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/owners', ownerRoutes);
app.use('/api/renters', renterRoutes);
app.use('/api/property-details', propertyDetailsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});