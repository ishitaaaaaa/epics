const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

const connectDB = require('./config/db')
connectDB();


//TESTS
const Depth = require('./models/Depth');
const Sediment = require('./models/Sediment');

app.post('/test-depth', async (req, res) => {
    try {
        const newDepth = new Depth(req.body);
        await newDepth.save();
        res.status(201).send(newDepth);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post('/test-sediment', async (req, res) => {
    try {
        const newSediment = new Sediment(req.body);
        await newSediment.save();
        res.status(201).send(newSediment);
    } catch (error) {
        res.status(400).send(error);
    }
});

//MAIN ROUTES
const routes = require('./routes');
app.use('/api', routes);

//ERROR HANDLING
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});