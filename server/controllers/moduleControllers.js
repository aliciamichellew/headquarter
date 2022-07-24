const asyncHandler = require("express-async-handler");
const axios = require("axios");
const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const Modules = require("../models/moduleModel");
const { response } = require("express");
// const { default: Profile } = require("../../client/src/components/Profile");

const NUSMODS_MODULELIST_URL =
  "https://api.nusmods.com/v2/2021-2022/moduleList.json";
const NUSMODS_MODULE_URL = "https://api.nusmods.com/v2/2021-2022/modules";

const getModulefromNUSMODS = async (req, res) => {
  const response = await axios.get(NUSMODS_MODULELIST_URL);
  if (response) {
    res.json(response.data);
  } else {
    res.status(422);
    throw new Error("Fetch All Modules Failed");
  }
};

const findModule = asyncHandler(async (request, response) => {
  const data = await axios.get(NUSMODS_MODULELIST_URL);
  const { searchQuery } = request.params;

  if (!data.data) {
    response.status(400);
    throw new Error("Fetch Failed!");
  }

  const module = data.data.filter((x) =>
    x.moduleCode.includes(searchQuery.toUpperCase())
  );

  response.json(module);
});

const findModulebyModuleCode = asyncHandler(async (request, res) => {
  const { moduleCode } = request.params;
  const url = `https://api.nusmods.com/v2/2021-2022/modules/${moduleCode.toUpperCase()}.json`;
  const response = await axios.get(url);
  if (response) {
    res.json({
      moduleCode: response.data.moduleCode,
      title: response.data.title,
    });
  } else {
    res.status(422);
    throw new Error("Module Not Found");
  }
});

const getMyModules = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      res.status(200).send({ message: "User not found!" });
    }
    res.json(profile.myModules);
  } catch (error) {
    res.status(400).send({ message: "Error occured when getting my module" });
  }
};

const getModuleTaken = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      res.status(200).send({ message: "User not found!" });
    }
    res.json(profile.moduleTaken);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error occured when getting module taken" });
  }
};

const userFollowModule = async (req, res) => {
  try {
    const checkFollow = req.query;

    const profile = await Profile.findOne({ user: checkFollow.userId });
    if (!profile) {
      res.status(200).send({ message: "User not found!" });
    }

    let followed = false;
    const findModuleFollowed = await Profile.findOne({
      user: checkFollow.userId,
      myModules: { $elemMatch: { moduleCode: checkFollow.moduleCode } },
    });

    if (findModuleFollowed) {
      followed = true;
    }
    res.json(followed);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error occured when checking user follow module" });
  }
};

const findModuleSearchQueryMyModules = async (req, res) => {
  try {
    const { userId, searchQuery } = req.params;
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      res.status(200).send({ message: "User not found!" });
    }
    const data = profile.myModules;
    if (!data) {
      response.status(400);
      throw new Error("Fetch Failed!");
    }

    const module = data.filter((x) =>
      x.moduleCode.includes(searchQuery.toUpperCase())
    );

    res.json(module);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error occured when doing search query my modules" });
  }
};

const userExperiencedModule = async (req, res) => {
  try {
    const checkExperienced = req.query;

    const profile = await Profile.findOne({ user: checkExperienced.userId });
    if (!profile) {
      res.status(200).send({ message: "User not found!" });
    }

    let experienced = false;
    const findModuleExperienced = await Profile.findOne({
      user: checkExperienced.userId,
      moduleTaken: { $elemMatch: { moduleCode: checkExperienced.moduleCode } },
    });

    if (findModuleExperienced) {
      experienced = true;
    }
    res.json(experienced);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error occured when checking user experience module" });
  }
};

const getExperiencedUser = async (req, res) => {
  try {
    const { moduleCode } = req.params;
    const module = await Modules.findOne({
      moduleCode: moduleCode,
    });

    const users = [];

    if (!module) {
      res.status(200).json(users);
    }
    console.log(module);
    const experiencedUsers = module.experiencedUser;
    console.log(experiencedUsers);

    if (experiencedUsers.length !== 0) {
      for (var item of experiencedUsers) {
        const findUser = await User.findOne({ _id: item.user });
        if (!findUser) {
          res.status(400).send({ message: "User does not exist" });
          return;
        }

        const data = {
          user: findUser,
          acadYear: item.acadYear,
          semester: item.semester,
        };
        users.push(data);
      }
    }
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .send({ message: "Error occured when getting experienced user" });
  }
};

module.exports = {
  findModule,
  getModulefromNUSMODS,
  findModulebyModuleCode,
  getMyModules,
  userFollowModule,
  findModuleSearchQueryMyModules,
  userExperiencedModule,
  getModuleTaken,
  getExperiencedUser,
};
