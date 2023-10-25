const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const History = require("../models/historyModel");
const Device = require("../models/deviceModel");


//@desc Get a single Device's history
//@route GET /api/history/:id
//@access private
const getHistory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid id!");
    }

    const dev = await Device.findById(id);
    if (!dev) {
        res.status(404);
        throw new Error("Device not found!");
    }

    const history = await History.find({ deviceId: id });
    if (history) {
        res.status(200).json(history);
    } else {
        res.status(400);
        throw new Error("Could not fetch the history!");
    }
});

//@desc Get all History
//@route GET /api/history/
//@access private
const getHistories = asyncHandler(async (req, res) => {
    const histories = await History.find({});
    if (histories) {
        res.status(200).json(histories);
    } else {
        res.status(400);
        throw new Error("Could not fetch histories!");
    }
});


module.exports = { getHistory, getHistories };