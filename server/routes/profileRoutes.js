const express = require("express");
const {
  updateUserProfile,
  followModule,
  unfollowModule,
  experiencedModule,
  unexperiencedModule,
  getUserProfile,
  followUser,
  unfollowUser,
} = require("../controllers/profileControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/getprofile/:userId").get(protect, getUserProfile);
router.route("/editprofile").put(protect, updateUserProfile);
router.route("/followmodule").put(protect, followModule);
router.route("/unfollowmodule").put(protect, unfollowModule);
router.route("/experiencedmodule").put(protect, experiencedModule);
router.route("/unexperiencedmodule").put(protect, unexperiencedModule);
router.route("/followuser").put(protect, followUser);
router.route("/unfollowuser").put(protect, unfollowUser);

module.exports = router;
