const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const { getRecipients, getRecipient, addRecipient, updateRecipient, deleteRecipient } = require("../controllers/emailRecipientController");

const router = express.Router();

router.get('/', validateToken, getRecipients);
router.get('/:id', validateToken, getRecipient);
router.post('/', validateToken, addRecipient);
router.put('/:id', validateToken, updateRecipient);
router.delete('/:id', validateToken, deleteRecipient);


module.exports = router;