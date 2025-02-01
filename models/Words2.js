const mongoose = require("mongoose");

// Define the schema
const WordSchema2 = new mongoose.Schema({
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
const Words2 = mongoose.model("Words2", WordSchema2);

module.exports = Words2;
