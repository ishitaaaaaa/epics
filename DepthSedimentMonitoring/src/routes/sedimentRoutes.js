const express = require('express');
const { createSediment, getSedimentRecords, getSedimentByLocation } = require('../controllers/sedimentController');
const router = express.Router();
const { validateSedimentData } = require('../middleware/validation');

router.post('/',validateSedimentData ,createSediment); // POST /sediment
router.get('/', getSedimentRecords); // GET /sediment
router.get('/:location', getSedimentByLocation); // GET /sediment/:location

router.get('/search', async (req, res) => {
    try {
        const { location, minSediment, maxSediment, units } = req.query;

        const filter = {};
        if (location) filter.location = { $regex: location, $options: 'i' }; // Case-insensitive search
        if (minSediment) filter.sedimentLevel = { $gte: parseFloat(minSediment) };
        if (maxSediment) filter.sedimentLevel = { ...filter.sedimentLevel, $lte: parseFloat(maxSediment) };
        if (units) filter.units = units;

        const results = await Sediment.find(filter);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error searching sediment data:', error);
        res.status(500).json({ error: 'Failed to search sediment data' });
    }
});

module.exports = router;