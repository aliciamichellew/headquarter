const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
var bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, () =>
  console.log("Database connected")
);

app.use(express.json());
app.use(cors());
// app.use("/app", routesUrls);
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.listen(4000, () => console.log("server is up and running"));
