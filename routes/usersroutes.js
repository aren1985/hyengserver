const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const router = express.Router();

// Middleware to verify token & attach user to req.user
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Extract token from 'Bearer <token>' format
  const tokenStr = token.split(" ")[1]; // Token should be in 'Bearer <token>' format

  if (!tokenStr) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  jwt
    .verify(tokenStr, process.env.JWT_SECRET)
    .then((decoded) => {
      req.user = decoded; // Attach user data to req.user
      next();
    })
    .catch(() => res.status(401).json({ message: "Invalid token" }));
};

// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

// Sign-Up Route
router.post("/signup", (req, res) => {
  const { name, lastname, nickname, email } = req.body;

  if (!name || !lastname || !nickname || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  User.findOne({ $or: [{ nickname }, { email }] })
    .then((existingUser) => {
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Nickname or Email already exists" });
      }

      const newUser = new User({
        name,
        lastname,
        nickname,
        email,
        // Default role is "user"
      });

      return newUser.save();
    })
    .then(() => res.status(201).json({ message: "User created successfully!" }))
    .catch(() => res.status(500).json({ message: "Server error" }));
});

router.post("/signin", (req, res) => {
  const { nickname, email } = req.body;

  if (!nickname || !email) {
    return res.status(400).json({ message: "Nickname and email are required" });
  }

  User.findOne({ nickname, email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Invalid nickname or email" });
      }

      // Now generate the JWT token
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Send the response with the token and user info
      res.status(200).json({
        message: "Sign-in successful",
        token,
        user, // Sending the user information along with the token
      });
    })
    .catch((err) => {
      console.error("Error:", err); // Log any error for better debugging
      res.status(500).json({ message: "Server error", error: err.message });
    });
});

// Forgot Nickname Route
router.post("/forgot-nickname", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Email not found" });
      }

      res.status(200).json({ nickname: user.nickname, role: user.role });
    })
    .catch(() => res.status(500).json({ message: "Server error" }));
});

// Get all users (Admin Only)
router.get("/admin", authMiddleware, isAdmin, (req, res) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch(() => res.status(500).json({ message: "Server error" }));
});

module.exports = router;
