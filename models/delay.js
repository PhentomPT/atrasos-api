const mongoose = require('mongoose');

const delaySchema = new mongoose.Schema({
    company: String,
    delay: Number,
    line: String,
    direction: String,
    status: String
});

const Delay = mongoose.model('Delay', delaySchema);

module.exports = Delay;