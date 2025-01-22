const Sediment = require('../models/Sediment');

// Create a new sediment record
const createSediment = async (req, res) => {
    try {
        const newSediment = new Sediment(req.body);
        await newSediment.save();
        res.status(201).json(newSediment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all sediment records
const getSedimentRecords = async (req, res) => {
    try {
        const sediments = await Sediment.find();
        res.status(200).json(sediments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get sediment records by location
const getSedimentByLocation = async (req, res) => {
    try {
        const sediments = await Sediment.find({ location: req.params.location });
        res.status(200).json(sediments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createSediment,
    getSedimentRecords,
    getSedimentByLocation
};