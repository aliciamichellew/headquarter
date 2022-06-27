const asyncHandler = require("express-async-handler");
const dummy = require("../dummyInternships");
const Profile = require("../models/profileModel");
const { response } = require("express");
const Internshipmodel = require('../models/InternshipModel');
const { Db } = require("mongodb");
// const { default: Profile } = require("../../client/src/components/Profile");


const getInternship = async (req, res) => {
  const response = await dummy.get(Db.listCollections(dummy));
  if (response) {
    res.json(response.data);
  } else {
    res.status(422);
    throw new Error("Fetch All Internship Failed");
  }
};
  
const findInternship = asyncHandler(async (request, response) => {
  const data = await Internshipmodel.get(dummy);
  const { searchQuery } = request.params;

  if (!data.data) {
    response.status(400);
    throw new Error("Fetch Failed!");
  }

  const Internship = await Internshipmodel.get(dummy) ({
    company: dummy.company,
    position: dummy.position,
  });


const findInternshipbyCompany= asyncHandler(async (request, res) => {
  const { company } = request.params;
  const response = await Internship.find({ company });
  if (response) {
    res.json({
      company: response.data.company,
      position: response.data.position,
    });
  } else {
    res.status(422);
    throw new Error("Company Not Found");
  }
});


const findInternshipbyPosition = asyncHandler(async (request, res) => {
  const response = await response.find(request.params.position);
  if (response) {
    res.json({
      company: response.data.company,
      position: response.data.position,
    });
  } else {
    res.status(422);
    throw new Error("Position Not Found");
  }
});

const findInternshipbyPositionandCompany = asyncHandler(async (request, res) => {
  const response = await response.find(request.params.company, request.params.position);
  
  if (response) {
    res.json({
      company: response.data.company,
      position: response.data.position,
    });
  } else {
    res.status(422);
    throw new Error("Internship Not Yet Created");
  }
});


const getMyInternship = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      res.status(200).send({ message: "User not found!" });
    }
    // console.log(profile);
    res.json(profile.myInternships);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error occured when getting my internship" });
  }
};

const userFollowInternship = async (req, res) => {
  try {
    console.log("masuk");
    const checkFollow = req.query;

    const profile = await Profile.findOne({ user: checkFollow.userId });
    if (!profile) {
      res.status(200).send({ message: "User not found!" });
    }

    let followed = false;
    const findInternshipFollowed = await Profile.findOne({
      user: checkFollow.userId,
      myInternships: { $elemMatch: { company: checkFollow.companyName, position: checkFollow.jobTitle } },
    });

    if (findInternshipFollowed) {
      followed = true;
    }
    console.log(followed);
    res.json(followed);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error occured when checking user follow internship" });
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

    // console.log(findSearchQuery);
    // console.log(findSearchQuery.searchQuery);

    const Internship = await Internshipmodel.get(dummy) ({
      company: Internshipmodel.company,
      position: Internshipmodel.position,
    });
  

    res.json(Internship);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: "Error occured when doing search query my internship" });
  }
};

module.exports = {
  findInternship,
  getInternship,
  findInternshipbyCompany,
  findInternshipbyPosition,
  findInternshipbyPositionandCompany,
  userFollowInternship,
  findInternshipSearchQueryMyInternships,
  getMyInternship
};
})