const express = require('express');
const cors = require('cors');
const propertyRoutes = require('./routes/propertyRoutes');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/properties', propertyRoutes);

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});