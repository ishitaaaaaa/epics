const mongoose = require('mongoose');

const depthSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
    },
    dateRecorded: {
        type: Date,
        default: Date.now,
    },
    depthValue: {
        type: Number,
        required: true,
        min: 0,
    },
    units: {
        type: String,
        default: 'meters',
        enum: ['meters', 'feet'],
    },
});

module.exports = mongoose.model('Depth', depthSchema);