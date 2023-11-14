const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Notificatoin = require("../models/notificationModel");
const Device = require("../models/deviceModel");


//@desc Get Notifications for single device
//@route GET /api/notification/:id
//@access private
const getNotification = asyncHandler(async (req, res) => {
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

    const notifications = await Notificatoin.find({ deviceId: id });
    if (notifications) {
        res.status(200).json(notifications);
    } else {
        res.status(400);
        throw new Error("Could not fetch the notification for provided device id!");
    }
});


//@desc Get all Notifications
//@route GET /api/notification/
//@access private
const getNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notificatoin.find({});
    if (notifications) {
        res.status(200).json(notifications);
    } else {
        res.status(400);
        throw new Error("Could not fetch notifications!");
    }
});


module.exports = { getNotification, getNotifications }