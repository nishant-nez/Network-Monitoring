const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const { getNotification, getNotifications } = require("../controllers/notificationController");

const router = express.Router();

router.get('/:id', validateToken, getNotification);
router.get('/', validateToken, getNotifications);


module.exports = router;