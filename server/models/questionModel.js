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
      },
      isAnonymous: {
        type: Boolean,
        default: false,
        required: true,
      },
    },
  ],
  moduleCode: {
    type: String,
  },
  company: {
    type: String,
  },
  position: {
    type: String,
  },
  internshipId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Internship",
  },
  date: {
    type: Date,
    required: true,
  },
});

const Question = mongoose.model("posts", QuestionSchema);

module.exports = Question;
