const express = require("express");
const router = express.Router();
const Themes = require("../models/Themes3"); // Adjust the path as needed

router.get("/themik3/:title", (req, res) => {
  const { title } = req.params;

  // Find the theme document by title
  Themes.findOne({ title })
    .then((themeDoc) => {
      if (!themeDoc) {
        return res
          .status(404)
          .json({ error: "Theme not found for this title." });
      }
      res.status(200).json(themeDoc);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Server error. Please try again later." });
    });
});

module.exports = router;
