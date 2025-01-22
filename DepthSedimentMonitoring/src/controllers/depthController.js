const Depth = require('../models/Depth');

// Create a new depth record
const createDepth = async (req, res) => {
    try {
        const newDepth = new Depth(req.body);
        await newDepth.save();
        res.status(201).json(newDepth);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all depth records
const getDepthRecords = async (req, res) => {
    try {
        const depths = await Depth.find();
        res.status(200).json(depths);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get depth records by location
const getDepthByLocation = async (req, res) => {
    try {
        const depths = await Depth.find({ location: req.params.location });
        res.status(200).json(depths);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createDepth,
    getDepthRecords,
    getDepthByLocation
};