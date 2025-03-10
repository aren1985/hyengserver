const mongoose = require("mongoose");

// Define the schema
const WordSchema4 = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  words: [
    {
      english: {
        type: String,
        required: true,
      },
      armenian: {
        type: String,
        required: true,
      },
    },
  ],
});

// Create the model
const Words4 = mongoose.model("Words4", WordSchema4);

module.exports = Words4;
