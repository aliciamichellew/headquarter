const express = require("express");
const {
  registerUser,
  authUser,
  findUsersbyEmail,
  verifyUser,
  sendForgotPassword,
  resetPassword,
} = require("../controllers/userControllers");
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/:email").get(findUsersbyEmail);
router.route("/verify/:token").get(verifyUser);
router.route("/sendforgotpassword").post(sendForgotPassword);
router.route("/resetpassword/:token").put(resetPassword);

module.exports = router;
