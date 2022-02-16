const { sign } = require("jsonwebtoken");

exports.GenerateUserToken = userInfo => {
    return sign({ data: userInfo }, process.env.SECRET, { expiresIn: 10*60 });
};