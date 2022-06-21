const mongoose = require("mongoose");
// const questionModel = require("./questionModel");
// const profileModel = require("./profileModel");

const moduleTemplate = new mongoose.Schema({
  moduleCode: {
    type: String,
    required: true,
    unique: true,
  },
  moduleTitle: {
    type: String,
    required: true,
  },
  experiencedUser: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      acadYear: {
        type: String,
        required: true,
      },
      semester: {
        type: String,
        required: true,
      },
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
  ],
});

const Module = mongoose.model("modules", moduleTemplate);

// const posts = mongoose.model("posts", questionModel);
// const users = mongoose.model("users", profileModel);

module.exports = Module;
