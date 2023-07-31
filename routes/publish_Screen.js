var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

require("../models/connection");
const Event = require("../models/events");
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");

//POST /places : ajout d’un event en base de données (via req.body)
router.post("/events", async (req, res) => {
  const placeName = req.body.name.toLowerCase();
  const creatorName = await User.findOne({ username });

  fetch(`https://api-adresse.data.gouv.fr/search/?q=${placeName}`)
    .then((response) => response.json())
    .then((data) => {
      const latitude = data.features[0].geometry.coordinates[1];
      const longitude = data.features[0].geometry.coordinates[0];

      if (latitude === undefined || longitude === undefined) {
        res.json({ result: false, error: "Latitude or longitude not found" });
        return;
      }

      const newEvent = new Event({
        creator: creatorName,
        eventName: req.body.eventName,
        type: req.body.type,
        date: req.body.date,
        hourStart: req.body.date,
        hourEnd: req.body.date,
        address: req.body.address,
        latitude: latitude,
        longitude: longitude,
        price: req.body.price,
        website: req.body.website,
        description: req.body.description,
        eventCover: img,        // à faire : mise en place de l'upload de la photo par le user
        users: [
          {
            interUsers: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
            partUsers: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
          },
        ],
      });

      newPlace.save().then(() => {
        res.json({ result: true });
      });
    });
});

module.exports = router;
