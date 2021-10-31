const mongoose = require("mongoose");
const { Schema } = mongoose;

const appointmentSchema = new Schema(
  {
    appointment_id: String,
    fullSchedule: String,
    year: String,
    month: String,
    day: String,
    time: String,
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    groupSize: Number,
  },
  { collection: "appointments" }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
