/** Implementing a signup endpoint for a signuping a user */
const { validationResult } = require("express-validator");

// user model
const { User } = require("../model/user_model");

exports.signup_user = async (req, res) => {
  const { firstname, lastname, phonenumber, email, password } = req.body;
  const result = validationResult(req);
  const hasErrors = result.isEmpty();
  if (!hasErrors) {
    result.mapped((e) => console.log(e.msg));
    return res.json(result.errors.length);
  }

  let user = new User(
    "Joshua",
    "ogunwole",
    "09031846448",
    "ogunwole888@gmail.com",
    "password"
  );

  console.log(user.signup_new_user());

  await res.json(user.signup_new_user());
};
