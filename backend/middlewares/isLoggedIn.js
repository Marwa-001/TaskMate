const jwt = require('jsonwebtoken')
const userModel = require('../models/user-model')

module.exports.isLoggedIn = async (req, res, next) => {
    const decodedUser = jwt.verify(req.cookies.token, "SECRET")
    const user = await userModel.findOne({ email: decodedUser.email }).select("-password")
    req.user = user
    next()
}