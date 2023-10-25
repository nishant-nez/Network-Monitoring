const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const EmailRecipients = require("../models/emailRecipientModel");


//@desc Get all Recipients
//@route GET /api/recipients
//@access private
const getRecipients = asyncHandler(async (req, res) => {
    const reps = await EmailRecipients.find({});
    if (reps) {
        res.status(200).json(reps);
    } else {
        res.status(400);
        throw new Error("Could not fetch email recipients!");
    }
});


//@desc Get a single Recipient
//@route GET /api/recipients/:id
//@access private
const getRecipient = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid id!");
    }

    const rep = await EmailRecipients.findById(id);
    if (rep) {
        res.status(200).json(rep);
    } else {
        res.status(400);
        throw new Error("Could not fetch the recipient!");
    }
});


//@desc Add a Recipient
//@route POST /api/recipients/
//@access private
const addRecipient = asyncHandler(async (req, res) => {
    const { email, description } = req.body;

    let finalDescription = description;
    if (!finalDescription) {
        finalDescription = '';
    }
    if (!email) {
        res.status(400);
        throw new Error("Please fill out all mandatory fields!");
    }
    // check for existing recipient
    const availableEmail = await EmailRecipients.findOne({ email });
    if (availableEmail) {
        res.status(400);
        throw new Error("User with this email already exists!");
    }

    const rep = await EmailRecipients.create({
        email,
        description: finalDescription,
    });

    if (rep) {
        res.status(201).json(rep);
    } else {
        res.status(400);
        throw new Error("Invalid recipient data!");
    }
});


//@desc Update a Recipient
//@route PUT /api/recipients/:id
//@access private
const updateRecipient = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid id!");
    }

    const rep = await EmailRecipients.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        },
        { new: true },
    );
    if (rep) {
        res.status(200).json(rep);
    } else {
        res.status(400);
        throw new Error("Could not update the recipient!");
    }
});


//@desc Delete a Recipient
//@route DELETE /api/recipients/:id
//@access private
const deleteRecipient = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid id!");
    }

    const rep = await EmailRecipients.findOneAndDelete({ _id: id });
    if (rep) {
        res.status(200).json(rep);
    } else {
        res.status(400);
        throw new Error("Could not fetch the recipient!");
    }
});


module.exports = { getRecipients, getRecipient, addRecipient, updateRecipient, deleteRecipient };