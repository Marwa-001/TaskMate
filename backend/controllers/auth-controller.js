const userModel = require('../models/user-model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body
    let user = await userModel.findOne({ email: email })
    if (!user) { return res.send("user does'nt exist, please register") }
    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email, id: user._id }, "SECRET")
            res.cookie("token", token)
            res.send(token)
        }
        else {
            res.send("something went wrong(wrong passowrd)")
        }
    })
}

module.exports.registerUser = async (req, res) => {
    let { name, email, password } = req.body
    let isExist = await userModel.findOne({ email: email })
    if (isExist) { return res.send("user already exists, you can login") }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let createdUser = await userModel.create({
                name,
                email,
                password: hash
            })
            res.send(createdUser)
        })
    })
}

module.exports.logout = (req, res) => {
    res.cookie("token", "")
    res.send("user logged out")
}