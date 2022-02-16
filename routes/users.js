var express = require("express");
const { body } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
var router = express.Router();


// controllers
const { signup_user } = require("../controller/user_controller");
// validation middleware
const { validate } = require("../middlewares/validation");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

const prisma = new PrismaClient();
/*Get users by posting*/
router.post(
  "/",
  body("firstname").exists({ checkFalsy: true }),
  body("lastname").exists({ checkFalsy: true }),
  body("phonenumber").isMobilePhone(),
  body("email")
    .normalizeEmail()
    .isEmail()
    .custom((value) => {
      return prisma.User.findUnique({
        where: {
          emailAddress: value,
        },
      })
        .then((user) => {
          if (user) {
            return Promise.reject("Account with this email exist!!");
          }
        })
        .catch((e) => Promise.reject(e));
    }),
  body("password").exists({ checkFalsy: true }).isLength({
    min: 8,
  }),
  validate,
  signup_user
);

module.exports = router;
