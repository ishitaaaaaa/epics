const express = require('express');
const { createDepth, getDepthRecords, getDepthByLocation } = require('../controllers/depthController');
const router = express.Router();
const { validateDepthData } = require('../middleware/validation');

router.post('/',validateDepthData, createDepth); // POST /depth
router.get('/', getDepthRecords); // GET /depth
router.get('/:location', getDepthByLocation); // GET /depth/:location

router.get('/search', async (req, res) => {
    try {
        const { location, minDepth, maxDepth, units } = req.query;

        // Validate query parameters
        if (minDepth && isNaN(minDepth)) {
            return res.status(400).json({ error: 'minDepth must be a number' });
        }
        if (maxDepth && isNaN(maxDepth)) {
            return res.status(400).json({ error: 'maxDepth must be a number' });
        }

        const filter = {};
        if (location) filter.location = { $regex: location, $options: 'i' }; // Case-insensitive search
        if (minDepth) filter.depthValue = { $gte: parseFloat(minDepth) };
        if (maxDepth) filter.depthValue = { ...filter.depthValue, $lte: parseFloat(maxDepth) };
        if (units) filter.units = units;

        const results = await Depth.find(filter);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error searching depth data:', error);
        res.status(500).json({ error: 'Failed to search depth data' });
    }
});

router.get('/average', async (req, res) => {
    try {
        const { location } = req.query;
        const matchCondition = location ? { location: { $regex: location, $options: 'i' } } : {};

        const aggregation = [
            { $match: matchCondition },
            { $group: { _id: '$date', averageDepth: { $avg: '$depthValue' } } },
            { $sort: { _id: 1 } }  // Sorting by date (or any field you want)
        ];

        const results = await Depth.aggregate(aggregation);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error in average depth calculation:', error);
        res.status(500).json({ error: 'Failed to calculate average depth' });
    }
});

router.get('/average', async (req, res) => {
    try {
        const { location } = req.query;
        const matchCondition = location ? { location: { $regex: location, $options: 'i' } } : {};

        const aggregation = [
            { $match: matchCondition },
            { $group: { _id: '$date', averageSediment: { $avg: '$sedimentLevel' } } },
            { $sort: { _id: 1 } }  // Sorting by date (or any field you want)
        ];

        const results = await Sediment.aggregate(aggregation);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error in average sediment calculation:', error);
        res.status(500).json({ error: 'Failed to calculate average sediment' });
    }
});

module.exports = router;