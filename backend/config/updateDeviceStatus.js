const ping = require("ping");
const Device = require("../models/deviceModel");
const History = require("../models/historyModel");

const updateDeviceStatus = async () => {
    // console.time("Cron took");
    // console.log("\nCron job ran (nice) - " + new Date);
    try {
        ////
        const devices = await Device.find({});
        // console.log('devices result: ')
        // console.log(devices);
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
                await device.save();
                await History.create({
                    deviceId: device._id,
                    status: status,
                    responseTime: responseTime,
                });
                // console.log(`Device ${ device.name } with IP ${ device.ip } has current status: ${ status } with response time of: ${ responseTime }ms`);
            }
        }
    } catch (error) {
        console.log("Error: ", error);
    }
    // console.log('\n');
    // console.timeEnd("Cron took");
};


module.exports = updateDeviceStatus;