const mongoose = require('mongoose');

const sedimentSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
    },
    dateRecorded: {
        type: Date,
        default: Date.now,
    },
    sedimentLevel: {
        type: Number,
        required: true,
        min: 0,
    },
    units: {
        type: String,
        default: 'grams per liter',
        enum: ['grams per liter', 'parts per million'],
    },
});

module.exports = mongoose.model('Sediment', sedimentSchema);