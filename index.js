const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const imageRoutes = require("./routes/imageRoutes");
const documentRoutes = require("./routes/documentRoutes");
const wordsRoute = require("./routes/wordsRoute");
const themeRoutes = require("./routes/themesRoutes");

require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors());

const port = process.env.PORT || 5000;
const mongourl = process.env.MONGOURL;

mongoose
  .connect(mongourl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

app.use("/images", imageRoutes);
app.use("/documents", documentRoutes);
app.use("/words", wordsRoute);
app.use("/themes", themeRoutes);

/*app.use("/", (req, res) => {
  res.json({
    name: "vaxo",
  });
});*/

app.use("/", async (req, res) => {
  try {
    const Words = require("./models/Words"); // Import your Words model
    const words = await Words.find(); // Fetch all words from the database

    res.json(words); // Respond with the words
  } catch (err) {
    console.error("Error fetching words:", err);
    res.status(500).json({ error: "Failed to fetch words" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
