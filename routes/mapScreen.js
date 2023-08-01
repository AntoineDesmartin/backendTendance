var express = require("express");
var router = express.Router();
const Event = require("../models/events");

/* GET all events */
router.get("/events", async function (req, res) {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

module.exports = router;
