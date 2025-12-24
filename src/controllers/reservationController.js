const { v4: uuid } = require("uuid");
const Event = require("../models/Event");
const Reservation = require("../models/Reservation");

// POST /reservations
exports.reserveSeats = async (req, res) => {
  const { partnerId, seats } = req.body;

  if (seats <= 0 || seats > 10) {
    return res.status(400).json({ error: "Invalid seat count" });
  }

  const event = await Event.findOne({ eventId: "node-meetup-2025" });

  if (event.availableSeats < seats) {
    return res.status(409).json({ error: "Not enough seats left" });
  }

  // Optimistic concurrency update
  const updated = await Event.findOneAndUpdate(
    {
      _id: event._id,
      version: event.version
    },
    {
      $inc: {
        availableSeats: -seats,
        version: 1
      }
    },
    { new: true }
  );

  if (!updated) {
    return res.status(409).json({ error: "Concurrent update detected" });
  }

  const reservation = await Reservation.create({
    reservationId: uuid(),
    partnerId,
    seats
  });

  res.status(201).json({
    reservationId: reservation.reservationId,
    seats,
    status: "confirmed"
  });
};

// DELETE /reservations/:id
exports.cancelReservation = async (req, res) => {
  const reservation = await Reservation.findOne({
    reservationId: req.params.id
  });

  if (!reservation) {
    return res.status(404).json({ error: "Reservation not found" });
  }

  await Event.findOneAndUpdate(
    { eventId: "node-meetup-2025" },
    { $inc: { availableSeats: reservation.seats, version: 1 } }
  );

  await reservation.deleteOne();

  res.status(204).send();
};

// GET /reservations
exports.getReservations = async (req, res) => {
  const reservations = await Reservation.find();
  res.status(200).json(reservations);
};

// GET /event/summary
exports.getSummary = async (req, res) => {
  const event = await Event.findOne({ eventId: "node-meetup-2025" });
  const count = await Reservation.countDocuments();

  res.status(200).json({
    eventId: event.eventId,
    name: event.name,
    totalSeats: event.totalSeats,
    availableSeats: event.availableSeats,
    reservationCount: count,
    version: event.version
  });
};
