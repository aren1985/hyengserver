const mongoose = require("mongoose");

const DocumentSchema3 = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  themes: [
    {
      themeTitle: {
        type: String,
        required: true,
      },
      words: [
        {
          english: {
            type: String,
            required: true, // English word
          },
          armenian: {
            type: String,
            required: true, // Armenian translation of the word
          },
        },
      ],
      sentences: [
        {
          english: {
            type: String,
            required: true, // English sentence
          },
          armenian: {
            type: String,
            required: true, // Armenian translation of the sentence
          },
        },
      ],
    },
  ],
});

// Export the model
module.exports = mongoose.model("Document3", DocumentSchema3);
