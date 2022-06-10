const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  bio: {
    type: String,
  },
  social: {
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
    website: {
      type: String,
    },
    github: {
      type: String,
    },
  },
  moduleTaken: [
    {
      module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "modules",
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
  internshipsExperience: [
    {
      internship: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Internship",
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
});

const Profile = mongoose.model("profile", ProfileSchema);

module.exports = Profile;
