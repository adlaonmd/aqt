require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;

//API routes
const availableScheduleRoutes = require("./routes/availableSchedule.routes");
const appointmentRoutes = require("./routes/appointment.routes");

//Express middlewares/settings
app.set("json spaces", 4);
app.use(express.json());
app.use(cors());

//Establish connection to database
require("./utils/db").connectDb();

app.get("/", (req, res) => {
  res.send("Hello, AQT API");
});

app.use("/api/available_schedule", availableScheduleRoutes);
app.use("/api/appointments", appointmentRoutes);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
