const express = require("express");
const {
  updateUserProfile,
  followInternship,
  unfollowInternship,
} = require("../controllers/profileControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/editprofile").put(protect, updateUserProfile);
router.route("/followinternship").put(protect, followInternship);
router.route("/unfollowinternship").put(protect, unfollowInternship);

module.exports = router;