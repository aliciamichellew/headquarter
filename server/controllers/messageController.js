const asyncHandler = require("express-async-handler");
const Message = require("../model/messageModel");
const User = require("../model/UserModel");
const Chat = require("../model/ChatModel");

const sendMessage = async (req, res) => {
  const { message, chatId } = req.body;

  if (!message || !chatId) {
    console.log("Please Provide All Fields To send Message");
    res.sendStatus(451);
  }

  let newMessage = {
    sender: req.user.id,
    message: message,
    chat: chatId,
  };

  let m = await Message.create(newMessage);

  m = await m.populate("sender", "username avatar");
  m = await m.populate("chat");
  m = await User.populate(m, {
    path: "chat.users",
    select: "username email _id",
  });

  await Chat.findByIdAndUpdate(chatId, { latestMessage: m }, { new: true });

  res.status(201).json(m);
};

const allMessages = async (req, res) => {
  const { chatId } = req.params;

  const getMessage = await Message.find({ chat: chatId })
    .populate("sender", "username email _id")
    .populate("chat");

  res.status(202).json(getMessage);
};

module.exports = { allMessages, sendMessage };