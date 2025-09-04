const express = require('express')
const userModel = require('../models/user-model')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {loginUser, registerUser, logout} = require('../controllers/auth-controller')
const {isLoggedIn} = require('../middlewares/isLoggedIn')
const upload = require('../middlewares/upload');

router.get('/', (req, res) => {
    res.send("user router working")
})

router.post('/login', loginUser)

router.post('/register', registerUser)

router.post('/logout', logout)

router.get('/profile', isLoggedIn, (req, res) => {
  res.json({ user: req.user });
});

router.post(
  '/upload-photo',
  isLoggedIn,
  upload.single('profilePhoto'),
  async (req, res) => {
    try {
      console.log("👉 Upload request received");
      console.log("File received:", req.file);
      console.log("User from token:", req.user);

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const user = await userModel.findById(req.user.id);
      if (!user) return res.status(404).json({ error: "User not found" });

      user.profilePhoto = `/uploads/${req.file.filename}`;
      await user.save();

      res.json({
        message: "Profile photo updated",
        profilePhoto: user.profilePhoto,
      });
    } catch (err) {
      console.error("❌ Upload error:", err);
      res.status(500).json({ error: err.message || "Failed to upload photo" });
    }
  }
);

module.exports = router