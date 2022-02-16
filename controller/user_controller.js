/** Implementing a signup endpoint for a signuping a user */
const { validationResult } = require("express-validator");
const { json } = require("stream/consumers");

// user model
const { User } = require("../model/user_model");

exports.signup_user = async (req, res) => {
  const { firstname, lastname, phonenumber, email, password } = req.body;
  const user = new User(firstname, lastname, phonenumber, email, password);

  try {
    const result = await user.signup_new_user();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};
