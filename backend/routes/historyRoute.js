const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const { getHistory, getHistories } = require("../controllers/historyController");

const router = express.Router();

router.get('/:id', validateToken, getHistory);
router.get('/', validateToken, getHistories);


module.exports = router;