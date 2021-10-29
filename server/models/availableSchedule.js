const mongoose = require("mongoose");
const { Schema } = mongoose;

const availableScheduleSchema = new Schema(
  {
    year: String,
    month: String,
    day: String,
    openingTime: String,
    closingTime: String,
    schedule: [
      {
        time: String,
        slots: Number,
      },
    ],
    persons: Number,
  },
  { collection: "available_schedule" }
);

module.exports = mongoose.model("AvailableSchedule", availableScheduleSchema);
