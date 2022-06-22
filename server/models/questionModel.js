const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  upvote: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  downvote: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  answers: [
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      text: String,
      date: {
        type: Date,
        default: Date.now,
        // required: true,
      },
      isAnonymous: {
        type: Boolean,
        default: false,
        required: true,
      },
    },
  ],
  module: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Question = mongoose.model("posts", QuestionSchema);

module.exports = Question;
