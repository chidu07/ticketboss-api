const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventId: String,
  name: String,
  totalSeats: Number,
  availableSeats: Number,
  version: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Event", eventSchema);
