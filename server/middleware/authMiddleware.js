const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require('dotenv').config()

const middle = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id).select("-password");
    next(); 
  } catch (err) {
    res.status(401).json({ message: "Token failed" });
  }
};

module.exports = middle;
