const nodemailer = require("nodemailer");

const sendMail = (recipients, subject, content, callback) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: recipients,
        subject: subject,
        text: content,
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            callback(error, null);
        } else {
            console.log("Email sent: ", info.response);
            callback(null, info.response);
        }
    });

}

module.exports = sendMail;