var express = require('express');
var router = express.Router();
const Event = require("../models/events");

/* GET all events */
router.get('/events', function(req, res) {
  const events = Event.find({});
  res.json(events)
});

module.exports = router;