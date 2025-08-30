const jwt = require('jsonwebtoken')
const userModel = require('../models/user-model')

module.exports.isLoggedIn = async (req, res, next) => {
    // You should use an environment variable for the secret key
    const secretKey = process.env.JWT_SECRET || 'SECRET'; 
    try {
        const token = req.cookies.token;
        if (!token) {
            // A proper API should respond with a 401 Unauthorized status
            return res.status(401).send("Unauthorized: No token provided.");
        }
        const decodedUser = jwt.verify(token, secretKey);
        const user = await userModel.findOne({ email: decodedUser.email }).select("-password");

        if (!user) {
            return res.status(401).send("Unauthorized: Invalid user.");
        }

        req.user = user;
        next();
    } catch (err) {
        // Handle token verification errors (e.g., token expired, invalid signature)
        res.status(401).send("Unauthorized: Invalid token.");
    }
}
