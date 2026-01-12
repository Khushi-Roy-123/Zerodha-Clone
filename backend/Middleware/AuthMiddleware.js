const User = require("../model/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res, next) => {
  const token = req.cookies.token;
  console.log("AuthMiddleware: Checking token...");
  if (!token) {
    console.log("AuthMiddleware: No token found in cookies.");
    return res.json({ status: false, message: "No token provided" });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      console.log("AuthMiddleware: Token verification failed.", err.message);
      return res.json({ status: false, message: "Token verification failed" });
    } else {
      const user = await User.findById(data.id);
      if (user) {
        console.log("AuthMiddleware: User verified:", user.username);
        req.user = user;
        next();
      } else {
        console.log("AuthMiddleware: User not found for token.");
        return res.json({ status: false, message: "User not found" });
      }
    }
  });
};
