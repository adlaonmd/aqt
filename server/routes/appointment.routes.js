const express = require("express");
const router = express.Router();
const controller = require("../controllers/appointment.controllers");

router.post("/", controller.addAppointment);
router.get("/", controller.getAppointments);
router.get("/:appointment_id", controller.getAppointment);
router.get("/:year/:month/:day", controller.getAppointmentsByDay);
router.patch("/cancel", controller.cancelAppointment);
router.patch("/arrived", controller.arrivedAppointment);

module.exports = router;
