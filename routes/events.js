var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");
const mongoose = require("mongoose");
require("../models/connection");
const Event = require("../models/events");
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");



//!__________POST /places : ajout d’un event en base de données (via req.body)__________________________

router.post("/publishEvent", async (req, res) => {
  res.json(req.body.address);
//   const addressToLocate = req.body.address;
//   // Encoder l'adresse pour gérer les espaces et intégrer l'adresse à l'url d'interrogation de l'API
//   const encodedAddressToLocate = encodeURIComponent(addressToLocate);;
//   // const creatorName = await User.findOne({ username: 'Lulu' });  //modifier pour récupérer le username du user connecté ?

//   //Compter le nombre de users intéressés et participant à l'event
// //   const countInterUsers = await User.countDocuments({
// //     _id: { $in: req.body.interUsers }, 
// //   });
// //   const countPartUsers = await User.countDocuments({
// //     _id: { $in: req.body.partUsers },
// // });

//   fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodedAddressToLocate}`)
//     .then((response) =>  {
//         if (!response.ok) {
//             throw new Error("Failed to fetch data from the external API");
//           }
//           return response.json();
//     })
//     .then((data) => {
//       const latitude = data.features[0].geometry.coordinates[1];
//       const longitude = data.features[0].geometry.coordinates[0];

//       if (latitude === undefined || longitude === undefined) {
//         res.json({ result: false, error: "Latitude or longitude not found" });
//         return;
//       }

//       const newEvent = new Event({
//         creator: req.body.creatorName, //! id du creator trouver dans le reducer id
//         eventName: req.body.eventName,
//         type: req.body.type,
//         date: req.body.date,
//         hourStart: req.body.hourStart,
//         hourEnd: req.body.hourEnd,
//         address: req.body.address,
//         latitude: latitude,
//         longitude: longitude,
//         price: req.body.price,
//         website: req.body.website,
//         description: req.body.description,
//         eventCover: "",      // à modifier : mise en place de l'upload de la photo par le user
//         users: 
//           {
//             interUsers: [],
//             partUsers: [req.body.creatorName],//! id du creator trouver dans le reducer id
//           },
        
//       });

//       newEvent.save().then(() => {
//         res.json({ result: true });
//       });
//     });
    
});


//! ____________________________GET all events_________________________________________________________ 
router.get("/events", async function (req, res) {
    try {
        const events = await Event.find({});
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch events" });
    }
});






module.exports = router;