const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const { getDevice, getDevices, addDevice, updateDevice, deleteDevice } = require("../controllers/deviceController");

const router = express.Router();

router.get('/:id', validateToken, getDevice);
router.get('/', validateToken, getDevices);
router.post('/', validateToken, addDevice);
router.put('/:id', validateToken, updateDevice);
router.delete('/:id', validateToken, deleteDevice);


module.exports = router;