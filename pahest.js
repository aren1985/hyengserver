const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/Users");

const router = express.Router();

// Sign-Up Route
router.post("/signup", (req, res) => {
  const { name, lastname, email, password } = req.body;

  // Validate input
  if (!name || !lastname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if email already exists
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Hash the password
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ message: "Error hashing password" });
        }

        // Create a new user
        const newUser = new User({
          name,
          lastname,
          email,
          password: hashedPassword,
        });

        newUser
          .save()
          .then(() =>
            res.status(201).json({ message: "User created successfully!" })
          )
          .catch((err) =>
            res.status(500).json({ message: "Error creating user" })
          );
      });
    })
    .catch((err) => res.status(500).json({ message: "Server error" }));
});

/// Sign-In Route
router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  // Validate inputs
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Check if user exists by email
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Invalid email or password" });
      }

      // Compare entered password with stored hashed password
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Server error" });
        }
        if (!result) {
          return res.status(401).json({ message: "Invalid email or password" });
        }

        // If authentication is successful, generate a token or respond with success
        const token = process.env.JWT_SECRET; // Replace with actual JWT token generation
        res.status(200).json({ message: "Sign-in successful", token });
      });
    })
    .catch((err) => {
      console.error(err); // Log any server errors
      res.status(500).json({ message: "Server error" });
    });
});

module.exports = router;

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
