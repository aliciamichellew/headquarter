const asyncHandler = require("express-async-handler");
const Profile = require("../models/profileModel");
const generateToken = require("../utils/generateToken");

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await Profile.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.profilePic = req.body.profilePic || user.profilePic;
    user.bio = req.body.bio || user.bio;
    user.social.twitter = req.body.social.twitter || user.social.twitter;
    user.social.facebook = req.body.social.facebook || user.social.facebook;
    user.social.linkedin = req.body.social.linkedin || user.social.linkedin;
    user.social.instagram = req.body.social.instagram || user.social.instagram;
    user.social.website = req.body.social.website || user.social.website;
    user.social.github = req.body.social.github || user.social.github;

    if (req.body.password) {
      user.password = req.body.passwword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      profilePic: updatedUser.profilePic,
      bio: updatedUser.bio,
      twitter: updatedUser.social.twitter,
      facebook: updatedUser.social.facebook,
      linkedin: updatedUser.social.linkedin,
      instagram: updatedUser.social.instagram,
      website: updatedUser.social.website,
      github: updatedUser.social.github,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  updateUserProfile,
};
