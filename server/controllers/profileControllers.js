const asyncHandler = require("express-async-handler");
const Profile = require("../models/profileModel");
const User = require("../models/userModel");

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

module.exports = {
  updateUserProfile,
};
