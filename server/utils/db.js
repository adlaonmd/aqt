const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

function connectDb() {
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "Connection error: "));
  db.once("open", () => {
    console.log("Database connected!");
  });
}

module.exports = { connectDb };
