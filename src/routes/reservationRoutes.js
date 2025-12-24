const express = require("express");
const router = express.Router();
const controller = require("../controllers/reservationController");

router.post("/reservations", controller.reserveSeats);
router.delete("/reservations/:id", controller.cancelReservation);
router.get("/reservations", controller.getReservations);
router.get("/event/summary", controller.getSummary);

module.exports = router;
