const express = require("express");
const Document2 = require("../models/Document3");
const router = express.Router();

// Route for fetching a specific document by title
router.get("/lessdocuments3/:title", (req, res) => {
  const title = req.params.title; // Get the title from the route parameters

  Document2.find({ title })
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({ error: "No data found for this title." });
      }
      res.json(data);
    })
    .catch((error) => {
      console.error("Fetch Error:", error);
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
