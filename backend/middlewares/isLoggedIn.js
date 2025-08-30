const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports.isLoggedIn = async (req, res, next) => {
  const secretKey = process.env.JWT_SECRET || 'SECRET';
  try {
    // support both cookie and Authorization header
    let token = req.cookies?.token;
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1]; // Bearer <token>
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided." });
    }

    const decodedUser = jwt.verify(token, secretKey);
    const user = await userModel.findById(decodedUser.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Invalid user." });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized: Invalid token." });
  }
};
