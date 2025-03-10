const mongoose = require("mongoose");

// Define the schema
const WordSchema3 = new mongoose.Schema({
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
const Words3 = mongoose.model("Words3", WordSchema3);

module.exports = Words3;
