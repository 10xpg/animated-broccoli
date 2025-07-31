const mongoose = require("mongoose");

const CONNECTION_STRING = process.env.DB_URI;

// Establish DB connection
mongoose.connect(CONNECTION_STRING);

// Check connection state
const db = mongoose.connection;

db.on("connected", () => {
  console.log("DB connection succesful");
});

db.on("err", () => {
  console.error("DB connection failed!");
});

module.exports = db;
