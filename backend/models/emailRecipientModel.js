const mongoose = require("mongoose");

const emailRecipientSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please add the email"],
            unique: [true, "Email already in the list"],
        },
        description: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("EmailRecipients", emailRecipientSchema);