const asyncHandler = require("express-async-handler");
const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const { post } = require("../routes/postRoutes");
const { findInternshipbyPositionandCompany } = require("./InternshipController");
const InternshipModel = require("../models/InternshipModel")

const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const newProfile = req.body.profile;
    console.log("newProfile", newProfile);

    // Disallow user to update email and username of profile
    if (
      newProfile.hasOwnProperty("email") ||
      newProfile.hasOwnProperty("username")
    ) {
      res.status(400).send({ message: "Cannot update email or username" });
    }

    const profile = await Profile.findOneAndUpdate(
      {
        user: req.user._id,
      },
      newProfile,
      { new: true }
    );

    // Need to update User db if first name or last name is updated
    if (
      newProfile.hasOwnProperty("firstName") ||
      newProfile.hasOwnProperty("lastName")
    ) {
      await User.findOneAndUpdate(
        {
          _id: req.user._id,
        },
        {
          firstName: profile.firstName,
          lastName: profile.lastName,
        },
        { new: true }
      );
    }

    res.status(200).send({ message: "Update status success" });
  } catch (err) {
    res.status(400).send({ message: "Error occured when updating user" });
  }
});

const followInternship = async (req, res) => {
  try {
    const { company, position, userId } = req.body;
    const response = await InternshipModel.get(company, position);
    console.log(response);
    if (!response) {
      res.status(400).send({ message: "Internship not found" });
      return;
    }
    const InternshipData = {
      company: response.data.company,
      position: response.data.position,
    };
    console.log(InternshipData);

    const findInternshipFollowed = await Profile.findOne({
      user: userId,
      myInternship: { $elemMatch: { company: company, position: position },
    }});

    if (findInternshipFollowed) {
      res.status(200).send({ message: "Internship followed already" });
      return;
    }
    await Profile.updateOne(
      { user: userId },
      { $push: { myInternship: InternshipData } }
    );
    res.status(200).send({ message: "Follow internship success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error occured when following internship" });
  }
};

const unfollowInternship = async (req, res) => {
  try {
    const { company, position, userId } = req.body;
    const response = await InternshipModel.get(company, position);
    console.log(response);
    if (!response) {
      res.status(400).send({ message: "Internship not found" });
      return;
    }
    const InternshipData = {
      company: response.data.company,
      position: response.data.position,
    };
    console.log(InternshipData);

    const findInternshipFollowed = await Profile.findOne({
      user: userId,
      myInternship: { $elemMatch: { company: company, position: position } },
    });

    if (!findInternshipFollowed) {
      res.status(200).send({ message: "Internship has not been followed" });
      return;
    }
    await Profile.updateOne(
      { user: userId },
      { $pull: { myInternship: InternshipData } }
    );
    res.status(200).send({ message: "Unfollow internship success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error occured when unfollowing internship" });
  }
};

module.exports = {
  updateUserProfile,
  followInternship,
  unfollowInternship,
};