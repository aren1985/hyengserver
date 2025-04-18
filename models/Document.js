const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
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
      video: {
        type: String, // YouTube link for the theme's video
        required: false, // Optional, can be omitted in requests
      },
    },
  ],
});

// Export the model
module.exports = mongoose.model("Document", DocumentSchema);
