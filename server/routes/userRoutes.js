const express = require("express");
const {
  registerUser,
  authUser,
  findUsersbyEmail,
  verifyUser,
} = require("../controllers/userControllers");
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/:email").get(findUsersbyEmail);
router.route("/verify/:token").get(verifyUser);

module.exports = router;
