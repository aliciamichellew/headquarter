const asyncHandler = require("express-async-handler");
const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const { post } = require("../routes/postRoutes");
const { findModulebyModuleCode } = require("./moduleControllers");
const axios = require("axios");

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

const followModule = async (req, res) => {
  try {
    const { moduleCode, userId } = req.body;
    const url = `https://api.nusmods.com/v2/2021-2022/modules/${moduleCode.toUpperCase()}.json`;
    const response = await axios.get(url);
    console.log(response);
    if (!response) {
      res.status(400).send({ message: "Module not found" });
      return;
    }
    const moduleData = {
      moduleCode: response.data.moduleCode,
      title: response.data.title,
    };
    console.log(moduleData);

    const findModuleFollowed = await Profile.findOne({
      user: userId,
      myModules: { $elemMatch: { moduleCode: moduleCode } },
    });

    if (findModuleFollowed) {
      res.status(200).send({ message: "Module followed already" });
      return;
    }
    await Profile.updateOne(
      { user: userId },
      { $push: { myModules: moduleData } }
    );
    res.status(200).send({ message: "Follow module success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error occured when following module" });
  }
};

const unfollowModule = async (req, res) => {
  try {
    const { moduleCode, userId } = req.body;
    const url = `https://api.nusmods.com/v2/2021-2022/modules/${moduleCode.toUpperCase()}.json`;
    const response = await axios.get(url);
    console.log(response);
    if (!response) {
      res.status(400).send({ message: "Module not found" });
      return;
    }
    const moduleData = {
      moduleCode: response.data.moduleCode,
      title: response.data.title,
    };
    console.log(moduleData);

    const findModuleFollowed = await Profile.findOne({
      user: userId,
      myModules: { $elemMatch: { moduleCode: moduleCode } },
    });

    if (!findModuleFollowed) {
      res.status(200).send({ message: "Module has not been followed" });
      return;
    }
    await Profile.updateOne(
      { user: userId },
      { $pull: { myModules: moduleData } }
    );
    res.status(200).send({ message: "Unfollow module success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error occured when unfollowing module" });
  }
};

const experiencedModule = async (req, res) => {
  try {
    const { moduleCode, userId, acadYear, semester } = req.body;
    const url = `https://api.nusmods.com/v2/2021-2022/modules/${moduleCode.toUpperCase()}.json`;
    const response = await axios.get(url);
    console.log(response);
    if (!response) {
      res.status(400).send({ message: "Module not found" });
      return;
    }
    const moduleData = {
      moduleCode: response.data.moduleCode,
      title: response.data.title,
      acadYear: acadYear,
      semester: semester,
    };
    console.log(moduleData);

    console.log("useraId", userId, "moduleCode", moduleCode);
    const findModuleExperienced = await Profile.findOne({
      user: userId,
      moduleTaken: { $elemMatch: { moduleCode: moduleCode } },
    });

    if (findModuleExperienced) {
      res.status(200).send({ message: "Module experienced already" });
      return;
    }
    await Profile.updateOne(
      { user: userId },
      { $push: { moduleTaken: moduleData } }
    );
    res.status(200).send({ message: "Experienced module success" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: "Error occured when adding module to experienced" });
  }
};

const unexperiencedModule = async (req, res) => {
  try {
    const { moduleCode, userId } = req.body;
    const url = `https://api.nusmods.com/v2/2021-2022/modules/${moduleCode.toUpperCase()}.json`;
    const response = await axios.get(url);
    console.log(response);
    if (!response) {
      res.status(400).send({ message: "Module not found" });
      return;
    }
    const moduleData = {
      moduleCode: response.data.moduleCode,
      title: response.data.title,
    };
    console.log(moduleData);

    console.log("useraId", userId, "moduleCode", moduleCode);

    const findModuleExperienced = await Profile.findOne({
      user: userId,
      moduleTaken: { $elemMatch: { moduleCode: moduleCode } },
    });

    console.log(findModuleExperienced);

    if (!findModuleExperienced) {
      res.status(200).send({ message: "User is not experienced" });
      return;
    }
    await Profile.updateOne(
      { user: userId },
      { $pull: { moduleTaken: { moduleCode: moduleCode } } }
    );
    res.status(200).send({ message: "Unexperienced module success" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: "Error occured when removing module from experienced" });
  }
};

module.exports = {
  updateUserProfile,
  followModule,
  unfollowModule,
  experiencedModule,
  unexperiencedModule,
};
