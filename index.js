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
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
