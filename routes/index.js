var express = require('express');
var router = express.Router();

require("../models/connection");
require("../models/connection");

// const User = require("../models/users");                      EXEMPLE
// const Tweet = require("../models/tweets");                    EXEMPLE

// const { checkBody } = require("../modules/checkBody");           Module


// const uid2 = require("uid2");
// const bcrypt = require("bcrypt");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
