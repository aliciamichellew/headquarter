const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const moduleRoutes = require("./routes/moduleRoutes");
const profileRoutes = require("./routes/profileRoutes");
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
app.use("/api/users", userRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/profile", profileRoutes);
app.use(notFound);
app.use(errorHandler);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const port = 4000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
