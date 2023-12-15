const History = require("../models/historyModel");

const deleteOldEntries = async () => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // Delete entries older than 7 days
        await History.deleteMany({ timestamp: { $lt: sevenDaysAgo } });

        console.log('Old entries deleted successfully.');
    } catch (error) {
        console.error('Error deleting old entries:', error);
    }
}


module.exports = deleteOldEntries;