const asyncHandler = require("express-async-handler");
const Profile = require("../models/profileModel");
const { response } = require("express");
const Internship = require("../models/InternshipModel");
const User = require("../models/userModel");
// const { default: Profile } = require("../../client/src/components/Profile");

const createInternship = asyncHandler(async (req, res) => {
  const { company, position } = req.body;

  if (!company || !position) {
    res.status(401);
    throw new Error("Please Enter all the Fields");
  }

  const InternshipExists = await Internship.findOne({ company, position });

  if (InternshipExists) {
    res.status(402);
    throw new Error("Internship already exists");
  }

  const internship = await Internship.create({
    company,
    position,
  });

  if (internship) {
    res.status(403).json({
      _id: Internship._id,
      company: Internship.company,
      position: Internship.position,
    });
  } else {
    res.status(404);
    throw new Error("Failed to create the Internship");
  }
});

const fetchInternship = asyncHandler(async (req, res) => {
  const internships = await Internship.find({}).sort({ createdAt: -1 });
  res.status(200).json(internships);
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
  }

  res.status(200).json(internship);
});

const getMyInternship = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await Profile.findOne({ userId: userId });
    if (!profile) {
      res.status(200).send({ message: "User not found!" });
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
    const checkExperienced = req.query;

    const profile = await Profile.findOne({ user: checkExperienced.userId });
    if (!profile) {
      res.status(200).send({ message: "User not found!" });
    }

    let experienced = false;
    const findInternshipExperienced = await Profile.findOne({
      user: checkExperienced.userId,
      internshipsExperience: { $elemMatch: {  id: checkExperienced._id } },
    });

    if (findInternshipExperienced) {
      experienced = true;
    }
    res.json(experienced);
  } catch (error) {
    res.status(400).send({
      message: "Error occured when checking user experience internship",
    });
  }
};
const getInternshipTaken = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      res.status(200).send({ message: "User not found!" });
    }
    res.json(profile.internshipsExperience);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error occured when getting internship taken" });
  }
};

const userFollowInternship = async (req, res) => {
  try {
    const checkFollow = req.query;

    const profile = await Profile.findOne({ user: checkFollow.userId });
    if (!profile) {
      res.status(200).send({ message: "User not found!" });
      return;
    }

    let followed = false;
    const findInternshipFollowed = await Profile.findOne({
      user: checkFollow.userId,
      myInternships: {
        $elemMatch: {
          companyName: checkFollow.companyName,
          jobTitle: checkFollow.jobTitle,
        },
      },
    });

    if (findInternshipFollowed) {
      followed = true;
    }
    res.json(followed);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error occured when checking user follow internship" });
  }
};

const getUserExperience = async(req,res) => {
  try{
    const {id} = req.params;
    const internship = await Internship.findOne({ id: id });
    const users =[];

    if(!internship) {
      res.status(201).json(users);
      return;
    }

  const experiencedUsers = internship.experiencedUser;
    if (experiencedUsers.length !== 0) {
      for (var item of experiencedUsers) {
        const findUser = await User.findOne({ _id: item.user });
        if (!findUser) {
          res.status(400).send({ message: "User does not exist" });
          return;
        }

        const data = {
          user: findUser,
          startDate: item.startDate,
          endDate: item.endDate,
        };
        users.push(data);
      }
    }
    res.status(200).json(users);
    return;
  } catch (err) {
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
  getUserExperience,
  /*getInternship,
  findInternshipbyPosition,
  findInternshipbyPositionandCompany,
  userFollowInternship,
  findInternshipSearchQueryMyInternships,
  getMyInternship */
};
