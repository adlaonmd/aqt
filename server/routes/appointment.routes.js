const express = require("express");
const router = express.Router();
const controller = require("../controllers/appointment.controllers");

router.post("/", controller.addAppointment);
router.get("/", controller.getAppointments);
router.delete("/:appointment_id", controller.deleteAppointment);

module.exports = router;
