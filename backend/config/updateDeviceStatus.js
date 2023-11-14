const ping = require("ping");
const Device = require("../models/deviceModel");
const History = require("../models/historyModel");
const emailRecipient = require("../models/emailRecipientModel");
const Notification = require("../models/notificationModel");

const sendMail = require("./sendMail");

const updateDeviceStatus = async () => {
    console.log("\nCron job ran (nice) - " + new Date);
    try {
        ////
        const devices = await Device.find({});
        const recipients = await emailRecipient.find({}, 'email');
        let recipientList = []
        recipients.map(obj => recipientList.push(obj.email))
        console.log(recipients);
        console.log(recipientList);

        if (devices.length === 0) {
            console.log("No device found!");
        } else {
            for (const device of devices) {
                const result = await ping.promise.probe(device.ip);
                const status = result.alive ? 'up' : 'down';
                let responseTime = -1;
                if (result.alive) {
                    responseTime = result.time;
                }

                device.status = status;
                device.responseTime = responseTime;

                // check if device is down and was down previously
                if (status === 'down' && device.status !== 'unknown') {
                    const subject = device.name + " is DOWN";
                    const content = `Device ${ device.name } with IP ${ device.ip } is currently down!`;
                    sendMail(recipientList, subject, content, async (error, response) => {
                        if (error) {
                            console.log("Error sending email: ", error);
                        } else {
                            console.log("Email sent successfully: ", response);
                            await Notification.create({
                                deviceId: device._id,
                                recipients: recipientList,
                                content: content,
                            });
                        }
                    });
                }

                await device.save();
                await History.create({
                    deviceId: device._id,
                    status: status,
                    responseTime: responseTime,
                });
                console.log(`Device ${ device.name } with IP ${ device.ip } has current status: ${ status } with response time of: ${ responseTime }ms`);
            }
        }
    } catch (error) {
        console.log("Error: ", error);
    }
    // console.log('\n');
    // console.timeEnd("Cron took");
};


module.exports = updateDeviceStatus;