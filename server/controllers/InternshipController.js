const asyncHandler = require("express-async-handler");
const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const { response } = require("express");
const Internship = require("../models/InternshipModel");
// const { default: Profile } = require("../../client/src/components/Profile");

const createInternship = asyncHandler(async (req, res) => {
  try {
    const { company, position } = req.body;

    if (!company || !position) {
      res.status(400).send({ message: "Please Enter All Fields" });
      return;
    }

    const InternshipExists = await Internship.findOne({ company, position });

    if (InternshipExists) {
      res.status(400).send({ message: "Internship already exist" });
      return;
    }

    const internship = await Internship.create({
      company,
      position,
    });

    if (internship) {
      res.status(201).json({
        _id: Internship._id,
        company: Internship.company,
        position: Internship.position,
      });
      return;
    }
  } catch (error) {
    // console.log(error);
    res
      .status(400)
      .send({ message: "Error occured when creating new internship" });
    return;
  }
});

const fetchInternship = asyncHandler(async (req, res) => {
  const internships = await Internship.find({}).sort({ createdAt: -1 });
  res.status(200).json(internships);
  return;
});
/*const addInternship = async (internshipId, postId) => {
  const internshipUpdated = await Internship.updateOne(
    {
      _id: internshipId,
    },
    {
      $push: { posts: postId },
    }
  );
  return internshipUpdated;
};*/

const findInternshipbyCompanyorPosition = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { company: { $regex: req.query.search, $options: "i" } },
          { position: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const internships = await Internship.find(keyword);
  res.send(internships);
});

const findInternshipbyCompanyandPosition = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $and: [
          { company: { $regex: req.query.search, $options: "i" } },
          { position: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const internships = await Internship.find(keyword);
  res.send(internships);
});

const findInternshipbyId = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const internship = await Internship.findOne({ _id: id });
  if (!internship) {
    return res.status(404).json({ error: "Internship does not exist" });
    return;
  }

  res.status(200).json(internship);
  return;
});

const getMyInternship = async (req, res) => {
  try {
    // console.log("masuk ke get my internship");
    const { userId } = req.params;
    const profile = await Profile.findOne({ user: userId });
    // console.log("profile = ", profile);
    if (!profile) {
      res.status(200).send({ message: "User not found!" });
      return;
    }
    res.json(profile.myInternships);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error occured when getting my internship" });
  }
};

const findInternshipSearchQueryMyInternships = async (req, res) => {
  try {
    const { userId, searchQuery } = req.params;
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      res.status(200).send({ message: "User not found!" });
      return;
    }
    const data = profile.myInternships;
    if (!data) {
      response.status(400);
      throw new Error("Fetch Failed!");
    }

    searchQuery = req.query.search
      ? {
          $or: [
            { company: { $regex: req.query.search, $options: "i" } },
            { position: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const internships = await Internship.find(searchQuery);
    res.send(internships);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error occured when doing search query my internship" });
  }
};

const userExperiencedInternship = async (req, res) => {
  try {
    // console.log("masuk api");
    // console.log("req.query = ", req.query);
    const checkExperienced = req.query;

    const profile = await Profile.findOne({ user: checkExperienced.userId });
    if (!profile) {
      res.status(200).send({ message: "User not found!" });
      return;
    }

    let experienced = false;
    const findInternshipExperienced = await Profile.findOne({
      user: checkExperienced.userId,
      internshipsExperience: {
        $elemMatch: { internshipId: checkExperienced.id },
      },
    });

    if (findInternshipExperienced) {
      experienced = true;
    }

    // console.log(experienced);
    res.json(experienced);
  } catch (error) {
    // console.log(error);
    res.status(400).send({
      message: "Error occured when checking user experience internship",
    });
    return;
  }
};
const getInternshipTaken = async (req, res) => {
  try {
    const { userId } = req.params;
    // console.log(userId);
    const profile = await Profile.findOne({ user: userId });
    // console.log(profile);
    if (!profile) {
      res.status(200).send({ message: "User not found!" });
      return;
    }
    // console.log(profile.internshipsExperience);
    res.json(profile.internshipsExperience);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error occured when getting internship taken" });
  }
};

const userFollowInternship = async (req, res) => {
  try {
    // console.log("masuk user follow internship");
    // console.log("req.query = ", req.query);
    const checkFollow = req.query;

    // console.log("checkFollow = ", checkFollow);

    const profile = await Profile.findOne({ user: checkFollow.userId });
    // console.log(profile);
    if (!profile) {
      res.status(200).send({ message: "User not found!" });
      return;
    }

    // console.log("profile = ", profile);
    let followed = false;
    // console.log("checkpoint 1");

    const findInternshipFollowed = await Profile.findOne({
      user: checkFollow.userId,
      myInternships: {
        $elemMatch: {
          _id: checkFollow._id,
        },
      },
    });
    // console.log("checkpoint 2");

    // console.log(findInternshipFollowed);
    if (findInternshipFollowed) {
      followed = true;
    }

    // console.log("followed", followed);

    res.json(followed);
  } catch (error) {
    // console.log(error);
    res
      .status(400)
      .send({ message: "Error occured when checking user follow internship" });
  }
};

const getExperiencedUser = async (req, res) => {
  try {
    console.log("masuk get experienced user");
    const { internshipId } = req.params;
    const intern = await Internship.findOne({ _id: internshipId });
    const users = [];

    console.log("intern = ", intern);

    const experiencedUser = intern.experiencedUser;

    console.log("experiencedUser = ", experiencedUser);

    if (experiencedUser.length !== 0) {
      for (var item of experiencedUser) {
        const findUser = await User.findOne({ _id: item.user });
        console.log("findUser = ", findUser);
        if (!findUser) {
          res.status(400).send({ message: "User does not exist" });
          return;
        }

        console.log(findUser);

        const data = {
          user: findUser,
          startDate: item.startDate,
          endDate: item.endDate,
        };
        users.push(data);
      }
    }
    console.log("users = ", users);
    res.status(200).json(users);
    return;
  } catch (error) {
    console.log("error = ", error);
    res
      .status(400)
      .send({ message: "Error occured when getting experienced user" });
  }
};

module.exports = {
  createInternship,
  fetchInternship,
  findInternshipbyCompanyorPosition,
  getMyInternship,
  getInternshipTaken,
  userFollowInternship,
  findInternshipSearchQueryMyInternships,
  userExperiencedInternship,
  findInternshipbyId,
  findInternshipbyCompanyandPosition,
  getExperiencedUser,
};
