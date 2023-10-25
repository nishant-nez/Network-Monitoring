const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
    deviceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        enum: ['up', 'down', 'unknown'],
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('History', historySchema);
