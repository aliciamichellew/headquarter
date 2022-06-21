const express = require("express");
const { updateUserProfile } = require("../controllers/profileControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/editprofile").put(protect, updateUserProfile);

module.exports = router;
