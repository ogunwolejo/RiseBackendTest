const { body, check } = require("express-validator");

exports.validate_signup_data = (req, res, next) => {
  const { firstname, lastname, phonenumber, email, password } = req.body;
  // using the express validators to validate the body
  body(firstname)
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("First name is required!!".toUpperCase());
  check(lastname)
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("First name is required!!".toUpperCase());
  body(phonenumber)
    .not()
    .isEmpty()
    .trim()
    .escape()
    .isMobilePhone()
    .withMessage("User Mobile Number is required".toUpperCase());
  body(email)
    .isEmail()
    .normalizeEmail()
    .withMessage("These is not a valid email!!".toUpperCase());

  body(password)
    .isLength({
      min: 8,
    })
    .withMessage("Password must contain atleast 8 characeter".toUpperCase());

  next();
};
