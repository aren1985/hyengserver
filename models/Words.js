const mongoose = require("mongoose");

// Define the schema
const WordSchema = new mongoose.Schema({
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
const Words = mongoose.model("Words", WordSchema);

module.exports = Words;
