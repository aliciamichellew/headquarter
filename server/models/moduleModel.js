const mongoose = require("mongoose");

const moduleTemplate = new mongoose.Schema({
  moduleCode: {
    type: String,
    required: true,
    unique: true,
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

module.exports = Module;
