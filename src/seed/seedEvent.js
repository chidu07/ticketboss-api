const Event = require("../models/Event");

const seedEvent = async () => {
  const existing = await Event.findOne({ eventId: "node-meetup-2025" });

  if (!existing) {
    await Event.create({
      eventId: "node-meetup-2025",
      name: "Node.js Meet-up",
      totalSeats: 500,
      availableSeats: 500,
      version: 0
    });
    console.log("Event Seeded");
  }
};

module.exports = seedEvent;
