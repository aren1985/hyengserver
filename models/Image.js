const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true, // Base64 image string
  },
  category: {
    type: [String], // Change this to an array
    enum: [
      "animals",
      "drinks",
      "transports",
      "home",
      "professions",
      "nature",
      "nature1",
      "buildings",
    ], // Restricts the categories
    required: true,
  },
  name: {
    type: String,
    required: true, // Name of the uploader or image
  },
  armenianName: {
    type: String,
  },
});

// Create the model
const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
