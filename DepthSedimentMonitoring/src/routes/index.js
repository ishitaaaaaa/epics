const express = require('express');
const depthRoutes = require('./depthRoutes');
const sedimentRoutes = require('./sedimentRoutes');
const router = express.Router();

router.use('/depth', depthRoutes);
router.use('/sediment', sedimentRoutes);

module.exports = router;