const userModel = require('../models/user-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist, please register" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ email, id: user._id }, process.env.JWT_SECRET || "SECRET", { expiresIn: "1h" });

    res.cookie("token", token, { httpOnly: true });
    res.json({
      token,
      user: { id: user._id, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const isExist = await userModel.findOne({ email });

        if (isExist) {
            return res.status(400).json({ message: "User already exists, please login" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const createdUser = await userModel.create({
            name,
            email,
            password: hash
        });

        // ✅ Step 1: Generate a JWT token for the new user
        const token = jwt.sign(
            { email, id: createdUser._id },
            process.env.JWT_SECRET || "SECRET",
            { expiresIn: "1h" }
        );
        
        // ✅ Step 2: Set the token in a cookie and send it in the response
        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({
            message: "User registered successfully",
            token,
            user: {
                id: createdUser._id,
                email: createdUser.email
            }
        });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports.logout = (req, res) => {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
    res.json({ message: "User logged out" });
}
