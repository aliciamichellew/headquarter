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
  getFollowing,
  getUserIdFromUsername,
  checkFollowUser,
  uploadProfilePic,
  followInternship,
  unfollowInternship,
  experiencedInternship,
  unexperiencedInternship,
  getUserProfiles,
  getUserFromUsername
} = require("../controllers/profileControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();
router.route("/").get(getUserProfiles);
router.route("/getprofile/:userId").get(protect, getUserProfile);
router.route("/fetchprofile/:username").get(getUserFromUsername);
router.route("/editprofile").put(protect, updateUserProfile);
router.route("/followmodule").put(protect, followModule);
router.route("/unfollowmodule").put(protect, unfollowModule);
router.route("/experiencedmodule").put(protect, experiencedModule);
router.route("/unexperiencedmodule").put(protect, unexperiencedModule);
router.route("/followuser").put(protect, followUser);
router.route("/unfollowuser").put(protect, unfollowUser);
// router.route("/unfollowuser").put(protect, unfollowUser);
router.route("/getfollowing/:userId").get(protect, getFollowing);
router.route("/getuserid/:username").get(getUserIdFromUsername);
router.route("/checkfollowuser").get(checkFollowUser);
router.route("/uploadprofilepic").post(uploadProfilePic);
router.route("/followinternship").put(protect, followInternship);
router.route("/unfollowinternship").put(protect, unfollowInternship);
router.route("/experiencedinternship").put(protect, experiencedInternship);
router.route("/unexperiencedinternship").put(protect, unexperiencedInternship);
module.exports = router;
