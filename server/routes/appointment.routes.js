const express = require("express");
const router = express.Router();
const controller = require("../controllers/appointment.controllers");

router.post("/", controller.addAppointment);

module.exports = router;
