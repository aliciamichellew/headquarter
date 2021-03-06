const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const generateToken = require("../utils/generateToken");
const { buildErrorObject } = require("../middlewares/errorMiddleware");

const findUserById = async (userId) => {
  return new Promise((resolve, reject) => {
    User.findById(userId, (err, item) => {
      itemNotFound(err, item, reject, "USER_DOES_NOT_EXIST");
      resolve(item);
    });
  });
};

const isUserExist = async (email, username) => {
  const user = await User.findOne({
    $or: [
      {
        email,
      },
      {
        username,
      },
    ],
  });

  return user ? true : false;
};

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    if (await isUserExist(email, username)) {
      res.status(400).send({ message: "User already exist" });
      return;
    }

    //insert data into user database
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    //insert data into profile database
    const profile = await Profile.create({
      user: user._id,
      firstName: firstName,
      lastName: lastName,
      username: username,
    });

    if (user && profile) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        password: user.password,
        token: generateToken(user._id),
      });
      return;
    } else {
      User.findOneAndDelete({ email });
      Profile.findOneAndDelete({ email });
      res
        .status(400)
        .send({ message: "Error occured when creating user and profile" });
      return;
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error occured when creating user and profile" });
  }
};

//login
const authUser = asyncHandler(async (request, response) => {
  // console.log("request body = ", request.body);
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      response.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
      return;
    } else {
      response.status(400);
      throw new Error("Invalid Email or Password!");
    }
  } catch (error) {
    // console.log(error);
    response.status(400).send({ message: "Error occured when auth user" });
    return;
  }
});

const findUsersbyEmail = async (request, response) => {
  try {
    const { email } = request.params;
    const user = await User.findOne({ email });

    if (user) {
      response.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
      });
      return;
    } else {
      response.status(400);
      throw new Error("No Users Found!");
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error occured when finding user by email" });
  }
};

const getUserFromToken = async (req, res) => {
  try {
    var tokenEncrypted = req.headers.authorization;
    if (tokenEncrypted) {
      tokenEncrypted = tokenEncrypted.replace("Bearer ", "").trim();
      let userId = await getUserIdFromToken(tokenEncrypted);
      const user = await findUserById(userId);
      res.status(200).json(user);
      return;
    } else {
      handleError(res, buildErrorObject(409, "No token available"));
      return;
    }
  } catch (err) {
    handleError(res, buildErrorObject(422, err.message));
  }
};

module.exports = {
  registerUser,
  authUser,
  findUsersbyEmail,
  getUserFromToken,
};
