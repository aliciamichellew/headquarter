const mongoose = require("mongoose");

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
  username: {
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
      internshipId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "internships",
        required: true,
      },
      companyName: {
        type: "String",
        required: true,
      },
      jobTitle: {
        type: "String",
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
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
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "internships",
        required: true,
      },
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
  myFollowing: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

const Profile = mongoose.model("profile", ProfileSchema);

module.exports = Profile;
