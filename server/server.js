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
const chatRoutes = require("./routes/chatRoutes")
const cors = require("cors");
var bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cloudinary = require("./cloudinary/cloudinary");
const socketIO = require("socket.io");

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
app.use("/api/internships", internshipRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/users", userRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/post", postRoutes);
app.use("/api/message", messageRoutes);
app.use(notFound);
app.use(errorHandler);

const port = 4000;

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/", async (req, res) => {});

const io = socketIO(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
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
