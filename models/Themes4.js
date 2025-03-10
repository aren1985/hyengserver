const mongoose = require("mongoose");

// Define the schema
const ThemeSchema4 = new mongoose.Schema({
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
const Themes4 = mongoose.model("Themes4", ThemeSchema4);

module.exports = Themes4;
