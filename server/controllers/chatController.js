const asyncHandler = require("express-async-handler");
const { response } = require("express");
const Chat = require("../models/ChatModel");
const User = require("../models/userModel");
const Profile = require("../models/profileModel");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.sendStatus(451);
  }

  var isChat = await Chat.find({
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: req.userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await Profile.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);

      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      res.status(452).send(FullChat);
    } catch (error) {
      res.status(404);
      throw new Error(error.messsage);
    }
  }
});

const fetchChat = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("LatestMessage")
      .sort({ updatedAt: -1 })
      .then(async results => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name email",
        });

        res.status(200).send(results);
      });
  } catch (error) {
    res.status(404);
    throw new Error(error.messsage);
  }
});

module.exports = {
  accessChat,
  fetchChat,
};
