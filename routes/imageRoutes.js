const express = require("express");
const mongoose = require("mongoose");
const Image = require("../models/Image");
const router = express.Router();

router.get("/allik/:category", (req, res) => {
  const category = req.params.category; // Get the category from the route parameters

  // Find images where the category array includes the specified category
  Image.find({ category: { $in: [category] } })
    .then((data) => {
      // Check if data is empty
      if (data.length === 0) {
        return res
          .status(404)
          .json({ error: "No images found for this category." });
      }
      // Send the found images as a response
      res.json(data);
    })
    .catch((error) => {
      console.error("Fetch Error:", error);
      res.status(500).json({ error: error.message });
    });
});

// Export the router
module.exports = router;
