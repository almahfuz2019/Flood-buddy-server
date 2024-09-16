const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel");

const createJwt = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log(req.body);

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Include email and role in the token payload
    const payload = {
      email: user.email,
      role: user.role,
    };

    // Generate the token
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "365d", // Expiration time
    });

    console.log("Generated token with role:", token);

    // Send token back in response
    res.json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

module.exports = createJwt;
