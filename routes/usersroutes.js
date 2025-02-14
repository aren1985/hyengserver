const express = require("express");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for token generation
const User = require("../models/Users");

const router = express.Router();

// Sign-Up Route
router.post("/signup", (req, res) => {
  const { name, lastname, nickname, email } = req.body;

  // Validate input
  if (!name || !lastname || !nickname || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if nickname or email already exists
  User.findOne({ $or: [{ nickname }, { email }] })
    .then((existingUser) => {
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Nickname or Email already exists" });
      }

      // Create a new user without password (since we're not using it)
      const newUser = new User({
        name,
        lastname,
        nickname,
        email,
      });

      newUser
        .save()
        .then(() =>
          res.status(201).json({ message: "User created successfully!" })
        )
        .catch((err) =>
          res.status(500).json({ message: "Error creating user" })
        );
    })
    .catch((err) => res.status(500).json({ message: "Server error" }));
});

// Sign-In Route
router.post("/signin", (req, res) => {
  const { nickname, email } = req.body;

  // Validate input
  if (!nickname || !email) {
    return res.status(400).json({ message: "Nickname and email are required" });
  }

  // Check if user exists by nickname and email
  User.findOne({ nickname, email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Invalid nickname or email" });
      }

      // Generate a JWT token (using the user's ID and secret)
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h", // Token expiration time (optional)
      });

      // Respond with success, the token, and user data
      res.status(200).json({ message: "Sign-in successful", token, user });
    })
    .catch((err) => {
      console.error(err); // Log any server errors
      res.status(500).json({ message: "Server error" });
    });
});

// Forgot Nickname Route
router.post("/forgot-nickname", (req, res) => {
  const { email } = req.body;

  // Validate email
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Look for the user by email
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Email not found" });
      }

      // Return the nickname associated with the email
      res.status(200).json({ nickname: user.nickname });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    });
});

module.exports = router;
