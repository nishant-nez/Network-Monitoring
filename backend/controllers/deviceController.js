const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Device = require("../models/deviceModel");


//@desc Get all Devices
//@route GET /api/devices
//@access private
const getDevices = asyncHandler(async (req, res) => {
    const devices = await Device.find({});
    if (devices) {
        res.status(200).json(devices);
    } else {
        res.status(400);
        throw new Error("Could not fetch devices!");
    }
});


//@desc Get a single device
//@route GET /api/devices/:id
//@access private
const getDevice = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid device id!");
    }

    const device = await Device.findById(id);
    if (device) {
        res.status(200).json(device);
    } else {
        res.status(400);
        throw new Error("Could not fetch the device!");
    }
});


//@desc Add a Device
//@route POST /api/devices/
//@access private
const addDevice = asyncHandler(async (req, res) => {
    const { name, type, ip, location, description } = req.body;

    let finalDescription = description;
    if (!finalDescription) {
        finalDescription = `${ name } at ${ location }`;
    }
    if (!name || !ip || !type || !location) {
        res.status(400);
        throw new Error("Please fill out all mandatory fields!");
    }
    // check for existing device ip
    const availableIP = await Device.findOne({ ip });
    if (availableIP) {
        res.status(400);
        throw new Error("Device with this IP already exists!");
    }

    const device = await Device.create({
        name,
        type,
        ip,
        location,
        description: finalDescription,
    });

    if (device) {
        res.status(201).json(
            {
                _id: device._id,
                name: device.name,
                ip: device.ip,
                type: device.type,
                location: device.location,
                description: device.description
            }
        );
    } else {
        res.status(400);
        throw new Error("Invalid device data!");
    }
});


//@desc Update a single device
//@route PUT /api/devices/:id
//@access private
const updateDevice = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid device id!");
    }

    const device = await Device.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        },
        { new: true },
    );
    if (device) {
        res.status(200).json(device);
    } else {
        res.status(400);
        throw new Error("Could not update the device!");
    }
});


//@desc Delete a device
//@route DELETE /api/devices/:id
//@access private
const deleteDevice = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid device id!");
    }

    const device = await Device.findOneAndDelete({ _id: id });
    if (device) {
        res.status(200).json(device);
    } else {
        res.status(400);
        throw new Error("Could not delete the device!");
    }
});


module.exports = { getDevice, getDevices, addDevice, updateDevice, deleteDevice };