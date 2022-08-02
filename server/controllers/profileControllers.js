const asyncHandler = require("express-async-handler");
const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const Modules = require("../models/moduleModel");
const Internship = require("../models/InternshipModel");
const axios = require("axios");
const cloudinary = require("../cloudinary/cloudinary");
const { userFollowModule } = require("./moduleControllers");

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
    return;
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error occured when getting user profile" });
  }
};

const getUserProfiles = asyncHandler(async (req, res) => {
  const profiles = await (
    await Profile.find({})
  ).find({ _id: { $ne: req.user._id } });
  res.status(200).json(profiles);
  return;
});

const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const newProfile = req.body.profile;

    // Disallow user to update email and username of profile
    if (
      newProfile.hasOwnProperty("email") ||
      newProfile.hasOwnProperty("username")
    ) {
      res.status(400).send({ message: "Cannot update email or username" });
      return;
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
    return;
  } catch (err) {
    res.status(400).send({ message: "Error occured when updating user" });
    return;
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
    return;
  } catch (error) {
    res.status(400).send({ message: "Error occured when following module" });
    return;
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
    return;
  } catch (error) {
    res.status(400).send({ message: "Error occured when unfollowing module" });
    return;
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
    return;
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error occured when adding module to experienced" });
    return;
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
    return;
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error occured when removing module from experienced" });
    return;
  }
};

const followUser = async (req, res) => {
  try {
    const { userId, userIdFollow } = req.body;

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

    await editFollowingList(userId, "$push", "myFollowing", userIdFollow);
    res.status(200).send({ message: "Follow user success" });
    return;
  } catch (error) {
    res.status(400).send({ message: "Error occured when following user" });
    return;
  }
};

const unfollowUser = async (req, res) => {
  try {
    const { userId, userIdFollow } = req.body;

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

    await editFollowingList(userId, "$pull", "myFollowing", userIdFollow);
    res.status(200).send({ message: "Unfollow user success" });

    return;
  } catch (error) {
    res.status(400).send({ message: "Error occured when unfollowing user" });
    return;
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
    res.status(200).json(following);
    return;
  } catch (error) {
    res.status(400).send({ message: "Error occured when get following" });
    return;
  }
};

const getUserIdFromUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username });
    res.json(user._id);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error occured when getting user id from username" });
  }
};

const getUserFromUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.find({ username: username });
    res.json(user);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error occured when getting user id from username" });
  }
};

const checkFollowUser = async (req, res) => {
  try {
    const { userId, userIdFollow } = req.query;

    // const findUser = await User.findOne({
    //   _id: userIdFollow,
    // });

    // if (!findUser) {
    //   res.status(200).send({ message: "User not found" });
    //   return;
    // }

    let follow = false;

    const findUserFollow = await Profile.findOne({
      user: userId,
      myFollowing: userIdFollow,
    });

    if (findUserFollow) {
      follow = true;
    }
    res.json(follow);
    return;
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error occured when checking user follow" });
    return;
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
        // console.log(error);
      }
      // console.log(result);
    }
  );
  try {
    res.status(200).json(uploadedImage);
    return;
  } catch (error) {}
};

const followInternship = async (req, res) => {
  try {
    const { _id, userId } = req.body;
    // console.log("follow req.body = ", req.body);
    // console.log(_id);
    const response = await Internship.findOne({ _id: _id });
    // console.log("follow response = ", response);
    if (!response) {
      res.status(400).send({ message: "Internship not found" });
      return;
    }
    const InternshipData = {
      _id: response._id,
      companyName: response.company,
      jobTitle: response.position,
    };

    // console.log("Internship data: ", InternshipData);

    const findInternshipFollowed = await Profile.findOne({
      user: userId,
      myInternships: {
        $elemMatch: { _id: _id },
      },
    });

    // console.log("follow checkpoint");
    // console.log("findInternshipFollowed: ", findInternshipFollowed);

    if (findInternshipFollowed) {
      res.status(200).send({ message: "Internship followed already" });
      return;
    }
    // console.log("Internship data: ", InternshipData);
    await Profile.updateOne(
      { user: userId },
      { $push: { myInternships: InternshipData } }
    );
    res.status(200).send({ message: "Follow internship success" });
    return;
  } catch (error) {
    // console.log("follow error = ", error);
    res
      .status(400)
      .send({ message: "Error occured when following internship" });
  }
};

const unfollowInternship = async (req, res) => {
  try {
    // console.log("unfollow = ", req.body);
    const { _id, userId } = req.body;
    const response = await Internship.findOne({ _id: _id });
    if (!response) {
      res.status(400).send({ message: "Internship not found" });
      return;
    }
    // console.log("response = ", response);

    const InternshipData = {
      _id: response._id,
      companyName: response.company,
      jobTitle: response.position,
    };

    // console.log("unfollow internship data = ", InternshipData);

    const findInternshipFollowed = await Profile.findOne({
      user: userId,
      myInternships: {
        $elemMatch: {
          _id: InternshipData._id,
          companyName: InternshipData.companyName,
          jobTitle: InternshipData.jobTitle,
        },
      },
    });

    // console.log("findInternshipFollowed = ", findInternshipFollowed);

    if (!findInternshipFollowed) {
      res.status(200).send({ message: "Internship has not been followed" });
      return;
    }
    await Profile.updateOne(
      { user: userId },
      { $pull: { myInternships: InternshipData } }
    );
    res.status(200).send({ message: "Unfollow internship success" });
    return;
  } catch (error) {
    // console.log("unfollow error = ", error);
    res
      .status(400)
      .send({ message: "Error occured when unfollowing internship" });
    return;
  }
};

const experiencedInternship = async (req, res) => {
  try {
    console.log("req.body = ", req.body);
    const { internshipId, userId, startDate, endDate } = req.body;
    const response = await Internship.findOne({ _id: internshipId });
    if (!response) {
      res.status(400).send({ message: "Internship not found" });
      return;
    }

    console.log("response = ", response);
    const internshipData = {
      internshipId: internshipId,
      companyName: response.company,
      jobTitle: response.position,
      startDate: startDate,
      endDate: endDate,
    };

    const userData = {
      user: userId,
      startDate: startDate,
      endDate: endDate,
    };

    console.log("internship data = ", internshipData);

    const findInternshipExperienced = await Profile.findOne({
      user: userId,
      internshipsExperience: {
        $elemMatch: { internshipId: internshipId },
      },
    });

    if (findInternshipExperienced) {
      res.status(200).send({ message: "Internship experienced already" });
      return;
    }
    await Profile.updateOne(
      { user: userId },
      { $push: { internshipsExperience: internshipData } }
    );

    await Internship.updateOne(
      { _id: internshipId },
      { $push: { experiencedUser: userData } }
    );
    res.status(200).send({ message: "Experienced internship success" });
    return;
  } catch (error) {
    console.log("experienced internship error = ", error);
    res
      .status(400)
      .send({ message: "Error occured when adding internship to experienced" });
    return;
  }
};

const unexperiencedInternship = async (req, res) => {
  try {
    console.log("unexperiencedInternship req.body = ", req.body);
    const { internshipId, userId } = req.body;
    const response = await Internship.findOne({ _id: internshipId });
    if (!response) {
      res.status(400).send({ message: "Internship not found" });
      return;
    }

    const findInternshipExperienced = await Profile.findOne({
      user: userId,
      internshipsExperience: {
        $elemMatch: { internshipId: internshipId },
      },
    });

    console.log("find Internship experienced: ", findInternshipExperienced);

    if (!findInternshipExperienced) {
      res.status(200).send({ message: "User is not experienced" });
      return;
    }
    await Profile.updateOne(
      { user: userId },
      {
        $pull: {
          internshipsExperience: { internshipId: internshipId },
        },
      }
    );

    await Internship.updateOne(
      { _id: internshipId },
      {
        $pull: {
          experiencedUser: { user: userId },
        },
      }
    );
    res.status(200).send({ message: "Unexperienced internship success" });
    return;
  } catch (error) {
    console.log("unexperienced internship error = ", error);
    res.status(400).send({
      message: "Error occured when removing internship from experienced",
    });
    return;
  }
};

module.exports = {
  getUserProfile,
  getUserProfiles,
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
  followInternship,
  unfollowInternship,
  experiencedInternship,
  unexperiencedInternship,
  getUserFromUsername,
};
