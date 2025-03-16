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
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"], // Only allow 'user' or 'admin'
    default: "user", // Default role is 'user' for regular users
  },
});

module.exports = mongoose.model("User", UserSchema);
