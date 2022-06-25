const express = require("express");
const {
  updateUserProfile,
  followModule,
  unfollowModule,
} = require("../controllers/profileControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/editprofile").put(protect, updateUserProfile);
router.route("/followmodule").put(protect, followModule);
router.route("/unfollowmodule").put(protect, unfollowModule);

module.exports = router;
