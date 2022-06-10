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
      },
      text: String,
      date: {
        type: Date,
      },
      isAnonymous: {
        type: Boolean,
        default: false,
      },
    },
  ],
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "modules",
    required: true,
  },
  date: {
    type: Date,
  },
});

const Question = mongoose.model("questions", QuestionSchema);

module.exports = Question;
