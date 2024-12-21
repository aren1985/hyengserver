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

const allowedOrigins = [
  "http://localhost:3000", // Local development (adjust if necessary)
  "https://hyeng.vercel.app/", // Production domain on Vercel
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow requests with matching origins
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
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
