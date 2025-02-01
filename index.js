const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const imageRoutes = require("./routes/imageRoutes");
const documentRoutes = require("./routes/documentRoutes");
const documentRoutes2 = require("./routes/documentRoutes2");
const wordsRoute = require("./routes/wordsRoute");
const themeRoutes = require("./routes/themesRoutes");
const authRoutes = require("./routes/usersroutes");

require("dotenv").config();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL in production
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Enable CORS middleware
app.use(cors(corsOptions));

const port = process.env.PORT || 10000;
const mongourl = process.env.MONGOURL;

mongoose
  .connect(mongourl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

app.use("/auth", authRoutes);
app.use("/images", imageRoutes);
app.use("/documents", documentRoutes);
app.use("/documents2", documentRoutes2);
app.use("/words", wordsRoute);
app.use("/themes", themeRoutes);

app.use("/", (req, res) => {
  res.json({
    name: "vaxo",
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
