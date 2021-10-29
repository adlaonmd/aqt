const express = require("express");
const router = express.Router();
const controller = require("../controllers/availableSchedule.controllers");

router.post("/", controller.addAvailableSchedule);
router.get("/:year", controller.getScheduleByYear);
router.get("/:year/:month", controller.getScheduleByYearMonth);
router.get("/:year/:month/:day", controller.getSchedule);
router.delete("/:_id", controller.deleteSchedule);

module.exports = router;
