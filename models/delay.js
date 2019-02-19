const mongoose = require('mongoose');

const companiesList = require('../lists/companies');
const delayStatusList = require('../lists/delay-status');

const delaySchema = new mongoose.Schema({
    company: {
        type: String,
        enum: companiesList,
        required: true
    },
    delay: {
        type: Number,
        required: true
    },
    line: {
        type: String,
        required: true
    },
    direction: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: delayStatusList,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now()
    },
    date_modified: {
        type: Date,
        default: Date.now()
    }
});

const Delay = mongoose.model('Delay', delaySchema);

module.exports = Delay;