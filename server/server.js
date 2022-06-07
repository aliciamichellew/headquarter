const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routesUrls = require("./routes/routes");
const cors = require("cors");
var bodyParser = require("body-parser");

const app = express();

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, () =>
  console.log("Database connected")
);

app.use(express.json());
// app.use(bodyParser.json());
app.use(cors());
app.use("/app", routesUrls);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.listen(4000, () => console.log("server is up and running"));
