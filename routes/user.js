var express = require("express");
var router = express.Router();

require("../models/connection");

const User = require("../models/users");
const Event = require("../models/events");

const { checkBody } = require("../modules/checkBody");

const uid2 = require("uid2");
const bcrypt = require("bcrypt");

//!SIGNUP____________________________________________________________________________________________________

router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["username", "email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  // Check if the user has not already been registered
  User.findOne({ username: req.body.username }).then((data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        token: uid2(32),
        profilPic: "",
        coverPic: "",
        events: {
          interEvents: [],
          partEvents: [],
        },
      });

      newUser.save().then((data) => {
        res.json({ result: true, data: newUser });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: "User already exists" });
    }
  });
});

//!SIGNIN____________________________________________________________________________________________________

router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["username", "email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ username: req.body.username }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({
        result: true,
        data: data,
      });
    } else {
      res.json({ result: false, error: "User not found or wrong password" });
    }
  });
});

//!ADD and REMOVE INTERRESTED_________________________________________________________________________________

// router.post("/interested",(req,res)=>{

//     User.findOneAndUpdate({_id:req.body.idUser},{ $push: { 'events.interEvents': req.body.idEvent } }).then(data=>{
//         res.json(data);
//     })
//     Event.findOneAndUpdate({_id:req.body.idEvent},{ $push: { 'events.interUsers': req.body.idUser } }).then(data=>{
//         res.json(data);
//     })

// })

// router.post("/notInterested",(req,res)=>{
//     User.findOneAndUpdate({_id:req.body.idUser},{ $pull: { 'events.interEvents': req.body.idEvent } }).then(data=>{
//         res.json(data);
//     })
//     Event.findOneAndUpdate({_id:req.body.idEvent},{ $pull: { 'events.interUsers': req.body.idUser } }).then(data=>{
//         res.json(data);
//     })
// })
router.post("/interested", (req, res) => {
  let result = {};

  User.findOneAndUpdate(
    { _id: req.body.idUser },
    { $push: { "events.interEvents": req.body.idEvent } }
  ).then((data) => {
    result.interestedUpdate = data;
    Event.findOneAndUpdate(
      { _id: req.body.idEvent },
      { $push: { "users.interUsers": req.body.idUser } }
    ).then((data) => {
      result.eventUpdate = data;
      res.json(result);
    });
  });
});

router.post("/notInterested", (req, res) => {
  let result = {};

  User.findOneAndUpdate(
    { _id: req.body.idUser },
    { $pull: { "events.interEvents": req.body.idEvent } }
  ).then((data) => {
    result.notInterestedUpdate = data;
    Event.findOneAndUpdate(
      { _id: req.body.idEvent },
      { $pull: { "users.interUsers": req.body.idUser } }
    ).then((data) => {
      result.eventUpdate = data;
      res.json(result);
    });
  });
});

//!ADD and REMOVE PARTICIPATION______________________________________________________________________________

// router.post("/participated",(req,res)=>{

//     User.findOneAndUpdate({_id:req.body.idUser},{ $push: { 'events.partEvents': req.body.idEvent } }).then(data=>{
//         res.json({result:true});
//     })
//     Event.findOneAndUpdate({_id:req.body.idEvent},{ $push: { 'events.partUsers': req.body.idUser } }).then(data=>{
//         res.json({result:true});
//     })

// })

// router.post("/notParticipated",(req,res)=>{

//     User.findOneAndUpdate({_id:req.body.idUser},{ $pull: { 'events.partEvents': req.body.idEvent } }).then(data=>{
//         res.json(data);
//     })
//     Event.findOneAndUpdate({_id:req.body.idEvent},{ $pull: { 'events.partUsers': req.body.idUser } }).then(data=>{
//         res.json(data);
//     })

// })
router.post("/participated", (req, res) => {
  let result = {};

  User.findOneAndUpdate(
    { _id: req.body.idUser },
    { $push: { "events.partEvents": req.body.idEvent } }
  ).then((data) => {
    result.participatedUpdate = data;
    Event.findOneAndUpdate(
      { _id: req.body.idEvent },
      { $push: { "users.partUsers": req.body.idUser } }
    ).then((data) => {
      result.eventUpdate = data;
      res.json(result);
    });
  });
});

router.post("/notParticipated", (req, res) => {
  let result = {};

  User.findOneAndUpdate(
    { _id: req.body.idUser },
    { $pull: { "events.partEvents": req.body.idEvent } }
  ).then((data) => {
    result.participatedUpdate = data;
    Event.findOneAndUpdate(
      { _id: req.body.idEvent },
      { $pull: { "users.partUsers": req.body.idUser } }
    ).then((data) => {
      result.eventUpdate = data;
      res.json(result);
    });
  });
});

//! On fetch les Event auxquelle on participe________________________________________________________________

router.post("/mesEvents", (req, res) => {
  User.findOne({ _id: req.body.idUser })
    .populate("events.partEvents")
    .then((data) => {
      res.json(data.events.partEvents);
    });
});

//! Requête pour obtenir le nom du user à partir de l'id

router.get("/byId", (req, res) => {
  
  User.findById(req.body.idUser).then((data) => {
    if (!data) {
      // Gérer le cas où l'utilisateur n'est pas trouvé
      res.json({ result: false, message: "Utilisateur non trouvé" });
    } else {
      // Répondre avec les données de l'utilisateur trouvé
      res.json({ result: true, data: data });
    }
  }).catch((err) => {
    // Gérer les erreurs possibles lors de la recherche
    res.json({ result: false, message: "Une erreur s'est produite lors de la recherche de l'utilisateur" });
  });
});


module.exports = router;
