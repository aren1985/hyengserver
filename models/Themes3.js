const mongoose = require("mongoose");

// Define the schema
const ThemeSchema3 = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  sentences: [
    {
      englishsentence: {
        type: String,
        required: true,
      },
      armeniansentence: {
        type: String,
        required: true,
      },
    },
  ],
});

// Create the model
const Themes3 = mongoose.model("Themes3", ThemeSchema3);

module.exports = Themes3;
