const asyncHandler = require("express-async-handler");
const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const Modules = require("../models/moduleModel");
const axios = require("axios");
const cloudinary = require("../cloudinary/cloudinary");

const editFollowingList = async (id, op, key, value) => {
  await Profile.updateOne(
    {
      user: id,
    },
    {
      [op]: { [key]: value },
    }
  );
};

const addExperiencedtoModule = async (moduleId, info) => {
  const moduleUpdated = await Modules.updateOne(
    {
      _id: moduleId,
    },
    {
      $push: { experiencedUser: info },
    }
  );
  return moduleUpdated;
};

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await Profile.findOne({
      user: userId,
    });
    res.json(profile);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: "Error occured when getting user profile" });
  }
};

const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const newProfile = req.body.profile;

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
    console.log(error);
    res.status(400).send({ message: "Error occured when updating user" });
  }
});

const followModule = async (req, res) => {
  try {
    const { moduleCode, userId } = req.body;
    const url = `https://api.nusmods.com/v2/2021-2022/modules/${moduleCode.toUpperCase()}.json`;
    const response = await axios.get(url);
    if (!response) {
      res.status(400).send({ message: "Module not found" });
      return;
    }
    const moduleData = {
      moduleCode: response.data.moduleCode,
      title: response.data.title,
    };

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
    res.status(400).send({ message: "Error occured when following module" });
  }
};

const unfollowModule = async (req, res) => {
  try {
    const { moduleCode, userId } = req.body;
    const url = `https://api.nusmods.com/v2/2021-2022/modules/${moduleCode.toUpperCase()}.json`;
    const response = await axios.get(url);
    if (!response) {
      res.status(400).send({ message: "Module not found" });
      return;
    }
    const moduleData = {
      moduleCode: response.data.moduleCode,
      title: response.data.title,
    };

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
    res.status(400).send({ message: "Error occured when unfollowing module" });
  }
};

const experiencedModule = async (req, res) => {
  try {
    const { moduleCode, userId, acadYear, semester } = req.body;
    const url = `https://api.nusmods.com/v2/2021-2022/modules/${moduleCode.toUpperCase()}.json`;
    const response = await axios.get(url);
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

    const moduleExists = await Modules.findOne({ moduleCode });

    const experiencedData = {
      user: userId,
      acadYear: acadYear,
      semester: semester,
    };
    if (!moduleExists) {
      const newModule = await Modules.create({
        moduleCode: moduleCode,
      });
      await addExperiencedtoModule(newModule._id, experiencedData);
    } else {
      await addExperiencedtoModule(moduleExists._id, experiencedData);
    }
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
    if (!response) {
      res.status(400).send({ message: "Module not found" });
      return;
    }
    const moduleData = {
      moduleCode: response.data.moduleCode,
      title: response.data.title,
    };

    const findModuleExperienced = await Profile.findOne({
      user: userId,
      moduleTaken: { $elemMatch: { moduleCode: moduleCode } },
    });

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
    res
      .status(400)
      .send({ message: "Error occured when removing module from experienced" });
  }
};

const followUser = async (req, res) => {
  try {
    const { userId, userIdFollow } = req.body;

    console.log(userIdFollow);

    const findUser = await User.findOne({
      _id: userIdFollow,
    });

    if (!findUser) {
      res.status(200).send({ message: "User not found" });
      return;
    }

    const findUserFollow = await Profile.findOne({
      user: userId,
      myFollowing: userIdFollow,
    });

    if (findUserFollow) {
      res.status(200).send({ message: "User has followed user" });
      return;
    }

    console.log(userIdFollow);
    await editFollowingList(userId, "$push", "myFollowing", userIdFollow);
    res.status(200).send({ message: "Follow user success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error occured when following user" });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const { userId, userIdFollow } = req.body;

    console.log(userIdFollow);

    const findUser = await User.findOne({
      _id: userIdFollow,
    });

    if (!findUser) {
      res.status(200).send({ message: "User not found" });
      return;
    }

    const findUserFollow = await Profile.findOne({
      user: userId,
      myFollowing: userIdFollow,
    });

    if (!findUserFollow) {
      res.status(200).send({ message: "User is not followed" });
      return;
    }

    console.log(userIdFollow);
    await editFollowingList(userId, "$pull", "myFollowing", userIdFollow);
    res.status(200).send({ message: "Unfollow user success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error occured when unfollowing user" });
  }
};

const getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await Profile.findOne({
      user: userId,
    });
    const following = [];
    if (profile.myFollowing.length !== 0) {
      for (var item of profile.myFollowing) {
        console.log("item", item);
        const findProfile = await Profile.findOne({
          user: item,
        });

        if (!findProfile) {
          res.status(400).send({ message: "Profile does not exist" });
          return;
        }

        following.push(findProfile);
      }
    }
    // console.log(following);
    res.status(200).json(following);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error occured when get following" });
  }
};

const getUserIdFromUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username });
    res.json(user._id);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: "Error occured when getting user id from username" });
  }
};

const checkFollowUser = async (req, res) => {
  try {
    const { userId, userIdFollow } = req.query;

    console.log(userIdFollow);

    // const findUser = await User.findOne({
    //   _id: userIdFollow,
    // });

    // if (!findUser) {
    //   res.status(200).send({ message: "User not found" });
    //   return;
    // }

    let follow = false;

    console.log(userId, userIdFollow);
    const findUserFollow = await Profile.findOne({
      user: userId,
      myFollowing: userIdFollow,
    });

    console.log(findUserFollow);
    if (findUserFollow) {
      follow = true;
    }
    res.json(follow);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: "Error occured when checking user follow" });
  }
};

const uploadProfilePic = async (req, res) => {
  const { image } = req.body;
  const uploadedImage = await cloudinary.uploader.upload(
    image,
    {
      upload_preset: "headquarter_profile",
      // public_id: `avatar`,
      allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
    },
    function (error, result) {
      if (error) {
        console.log(error);
      }
      console.log(result);
    }
  );
  try {
    res.status(200).json(uploadedImage);
  } catch (error) {
    console.log(error);
  }
  // res.status(200).json(result);
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  followModule,
  unfollowModule,
  experiencedModule,
  unexperiencedModule,
  followUser,
  unfollowUser,
  getFollowing,
  getUserIdFromUsername,
  checkFollowUser,
  uploadProfilePic,
};
