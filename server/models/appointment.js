const mongoose = require("mongoose");
const { Schema } = mongoose;

const appointmentSchema = new Schema(
  {
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
