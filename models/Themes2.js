const mongoose = require("mongoose");

// Define the schema
const ThemeSchema2 = new mongoose.Schema({
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
const Themes2 = mongoose.model("Themes2", ThemeSchema2);

module.exports = Themes2;
