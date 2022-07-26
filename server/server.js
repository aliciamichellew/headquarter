require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const moduleRoutes = require("./routes/moduleRoutes");
const profileRoutes = require("./routes/profileRoutes");
const postRoutes = require("./routes/postRoutes");
const messageRoutes = require("./routes/messageRoutes");
const internshipRoutes = require("./routes/Internshiproutes");
const chatRoutes = require("./routes/chatRoutes");
const path = require("path");
const cors = require("cors");
var bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cloudinary = require("./cloudinary/cloudinary");
const socketIO = require("socket.io");

const app = express();

dotenv.config();

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname + "/public")));

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

mongoose.connect(process.env.DATABASE_ACCESS, () =>
  console.log("Database connected")
);

app.use(cors());
app.use("/api/internships", internshipRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/users", userRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/post", postRoutes);
app.use("/api/message", messageRoutes);
app.use(notFound);
app.use(errorHandler);

// console.log(path.join(__dirname, "../", "client/", "build/", "index.html"));
// console.log(path.resolve(__dirname, "client", "build", "index.html"));

// if (process.env.NODE_ENV === "production") {
//   console.log("masuk if");
//   // app.use(express.static("client/build"));
//   app.use(express.static(path.join(__dirname + "/public")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });

// app.use(function (req, res, next) {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://headquarter-orbital.herokuapp.com"
//   ); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
//}

const io = socketIO(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);

    socket.emit("connected");
  });
  socket.on("join-chat", (room) => {
    socket.join(room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop-typing", (room) => socket.in(room).emit("stop-typing"));

  socket.on("new-message", (newMessageReceived) => {
    let chat = newMessageReceived.chat;

    if (!chat.users) return console.log(`chat.users not defined`);

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message-received", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    socket.leave(userData._id);
  });
});
