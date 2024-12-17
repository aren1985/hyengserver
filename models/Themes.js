const mongoose = require("mongoose");

// Define the schema
const ThemeSchema = new mongoose.Schema({
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
const Themes = mongoose.model("Themes", ThemeSchema);

module.exports = Themes;
