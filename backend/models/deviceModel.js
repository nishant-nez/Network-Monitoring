const mongoose = require("mongoose");

const deviceSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add the name"],
        },
        type: {
            type: String,
            required: [true, "Please add the device type"],
        },
        ip: {
            type: String,
            required: [true, "Please add the device ip address"],
        },
        description: {
            type: String,
        },
        responseTime: {
            type: String,
        },
        status: {
            type: String,
            enum: ['up', 'down', 'unknown'],
            default: 'unknown',
        },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Device", deviceSchema);