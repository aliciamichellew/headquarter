const mongoose = require("mongoose");
const userModel = require("./userModel");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
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
    default: {},
  },
  moduleTaken: [
    {
      moduleCode: {
        type: "String",
        required: true,
      },
      title: {
        type: "String",
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
        ref: "internships",
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
  myModules: [
    {
      moduleCode: {
        type: "String",
        required: true,
      },
      title: {
        type: "String",
        required: true,
      },
    },
  ],
  myInternships: [
    {
      companyName: {
        type: "String",
        required: true,
      },
      jobTitle: {
        type: "String",
        required: true,
      },
    },
  ],
  myPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
  ],
});

const Profile = mongoose.model("profile", ProfileSchema);

module.exports = Profile;
