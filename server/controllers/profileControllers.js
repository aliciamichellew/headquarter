const asyncHandler = require("express-async-handler");
const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const newProfile = req.body.profile;
    console.log("newProfile", newProfile);

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

    if (
      newProfile.hasOwnProperty("firstName") ||
      newProfile.hasOwnProperty("lastName")
    ) {
      console.log("masuk");
      console.log(req.user._id);
      const updatedUser = await User.findOneAndUpdate(
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

    console.log("profile", profile);
    res.status(200).send({ message: "Update status success" });
    return;
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Error occured when updating user" });
  }
});

module.exports = {
  updateUserProfile,
};
