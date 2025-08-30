const express = require('express')
const userModel = require('../models/user-model')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {loginUser, registerUser, logout} = require('../controllers/auth-controller')
const {isLoggedIn} = require('../middlewares/isLoggedIn')

router.get('/', (req, res) => {
    res.send("user router working")
})

router.post('/login', loginUser)

router.post('/register', registerUser)

router.post('/logout', logout)

router.get('/profile', isLoggedIn, (req, res) => {
  res.json({ user: req.user });
});


module.exports = router