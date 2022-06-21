const express = require("express");
const {
  registerUser,
  authUser,
  findUsersbyEmail,
} = require("../controllers/userControllers");
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/:email").get(findUsersbyEmail);

module.exports = router;
