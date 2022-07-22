require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const moduleRoutes = require("./routes/moduleRoutes");
const profileRoutes = require("./routes/profileRoutes");
const postRoutes = require("./routes/postRoutes");
const cors = require("cors");
var bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cloudinary = require("./cloudinary/cloudinary");

const app = express();

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, () =>
  console.log("Database connected")
);

// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
// for parsing json
// app.use(
//   bodyParser.json({
//     limit: "20mb",
//   })
// );

// // for parsing application/x-www-form-urlencoded
// app.use(
//   bodyParser.urlencoded({
//     limit: "20mb",
//     extended: true,
//   })
// );
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/post", postRoutes);
app.use(notFound);
app.use(errorHandler);

const port = 4000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/", async (req, res) => {});
