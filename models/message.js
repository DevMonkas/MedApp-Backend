const mongoose = require("mongoose");
var message = new mongoose.Schema({
  to: String,
  from: String,
  message: String,
  created_at: { type: Date, default: new Date().toUTCString() },
});

module.exports = message;
