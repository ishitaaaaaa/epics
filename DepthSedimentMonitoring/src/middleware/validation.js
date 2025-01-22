const validateDepthData = (req, res, next) => {
    const { location, depthValue, units } = req.body;

    if (!location || typeof location !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing location' });
    }

    if (typeof depthValue !== 'number' || depthValue < 0) {
        return res.status(400).json({ error: 'Invalid or missing depth value' });
    }

    if (units && !['meters', 'feet'].includes(units)) {
        return res.status(400).json({ error: 'Invalid units' });
    }

    next();
};

const validateSedimentData = (req, res, next) => {
    const { location, sedimentLevel, units } = req.body;

    if (!location || typeof location !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing location' });
    }

    if (typeof sedimentLevel !== 'number' || sedimentLevel < 0) {
        return res.status(400).json({ error: 'Invalid or missing sediment level' });
    }

    if (units && !['grams per liter', 'parts per million'].includes(units)) {
        return res.status(400).json({ error: 'Invalid units' });
    }

    next();
};

module.exports = {
    validateDepthData,
    validateSedimentData,
};