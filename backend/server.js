const express = require("express");
const cron = require("node-cron");
const updateDeviceStatus = require("./config/updateDeviceStatus");
const deleteOldEntries = require("./config/deleteOldEntries");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors")
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use(cors());

// routes
app.get('/', (req, res) => res.status(200).json({ message: "Welcome to the API!" }));
app.use('/api/users', require("./routes/userRoute"));
app.use('/api/devices', require("./routes/deviceRoute"));
app.use('/api/recipitents', require("./routes/emailRecipientRoute"));
app.use('/api/history', require("./routes/historyRoute"));
app.use('/api/recipients', require("./routes/emailRecipientRoute"));
app.use('/api/notification', require("./routes/notificationRoute"));

// middlewares
app.use(errorHandler);

// cron jobs
cron.schedule('*/5 * * * *', () => {
    updateDeviceStatus();
});

cron.schedule('*/1 * * * *', () => {
    deleteOldEntries();
});

app.listen(port, (error) => {
    if (!error) {
        console.log(`Server is running on port ${ port }`);
    } else {
        console.log(`The server could not be started on port ${ port }`);
        console.log("Error: " + error);
    }
});