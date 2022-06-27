const mongoose = require("mongoose");

const InternshipTemplate = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  Position: {
    type: String,
    required: true
  },
  experiencedUser: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
          startDate: {
            type: Date,
            required: true,
          },
          endDate: {
            type: Date,
          },
          current: {
            type: Boolean,
            default: false,
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

const Internship = mongoose.model("Internship", InternshipTemplate);
module.exports = Internship;
