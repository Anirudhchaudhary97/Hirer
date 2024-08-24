const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  try {
    // check token is available or not
    const token = await req.cookies.token;
    if (!token) {
      return res.status(401).json({
        msg: "unauthorized user",
        success: false,
      });
    }
    // verify a token
    const decoded = jwt.verify(token, process.env.SECRECT_KEY);
    if (!decoded) {
      return res.status(401).json({
        msg: "invalid token",
        success: false,
      });
    }

    // req.phoneNumber = decoded.phoneNumber;
    const phoneNumber = decoded.phoneNumber;
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(401).json({
        msg: "User not found",
        success: false,
      });
    }

    req.user = user;
    //proced to next route or middleware
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({
      msg: "Authentication failed",
      success: false,
      error: error.message,
    });
  }
};

module.exports = { isAuthenticated };
