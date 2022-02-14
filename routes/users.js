var express = require("express");
var router = express.Router();

// controllers
const { signup_user } = require("../controller/user");
// validation middleware
const { validate_signup_data } = require("../utils/validation");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
