const express = require("express");
const connectDB = require("./config/db");
const seedEvent = require("./seed/seedEvent");
const routes = require("./routes/reservationRoutes");

const app = express();
app.use(express.json());

connectDB().then(seedEvent);

app.use("/", routes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
