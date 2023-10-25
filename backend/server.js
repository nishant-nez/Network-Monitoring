const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT;

app.use(express.json());

// routes
app.get('/', (req, res) => res.status(200).json({ message: "Welcome to the API!" }));
app.use('/api/users', require("./routes/userRoute"));
app.use('/api/devices', require("./routes/deviceRoute"));
app.use('/api/recipitents', require("./routes/emailRecipientRoute"));
app.use('/api/history', require("./routes/historyRoute"));

// middlewares
app.use(errorHandler);

app.listen(port, (error) => {
    if (!error) {
        console.log(`Server is running on port ${ port }`);
    } else {
        console.log(`The server could not be started on port ${ port }`);
        console.log("Error: " + error);
    }
});