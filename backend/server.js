const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const postRoutes = require("./routes/postRoutes");
const cors = require("cors");
var bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config();
mongoose.connect(process.env.DATABASE_ACCESS, () =>
  console.log("Database connected")
);

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/post", postRoutes);
app.use(notFound);
app.use(errorHandler);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


app.listen(4000, () => {
  console.log("Server is running at port 4000");
});

