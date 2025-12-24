const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  reservationId: String,
  partnerId: String,
  seats: Number,
  status: {
    type: String,
    default: "confirmed"
  }
});

module.exports = mongoose.model("Reservation", reservationSchema);
