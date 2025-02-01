const express = require("express");
const router = express.Router();
const Words = require("../models/Words2"); // Adjust the path as needed

router.get("/wordik2/:title", (req, res) => {
  const { title } = req.params;

  // Find the words document by title
  Words.findOne({ title })
    .then((wordsDoc) => {
      if (!wordsDoc) {
        return res
          .status(404)
          .json({ error: "Words not found for this title." });
      }
      res.status(200).json(wordsDoc);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Server error. Please try again later." });
    });
});

module.exports = router;
