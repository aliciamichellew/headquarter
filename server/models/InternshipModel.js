const mongoose = require("mongoose");

const InternshipSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  position: {
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
      required: true
    },
  ],
});

const Internship = mongoose.model("Internship", InternshipSchema);
module.exports = Internship;
