const express = require("express");
const signUpTemplate = require("../models/userModel");
const { registerUser, authUser } = require("../controllers/userControllers");
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);

module.exports = router;
