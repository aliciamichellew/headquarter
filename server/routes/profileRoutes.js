const express = require("express");
const { updateUserProfile } = require("../controllers/profileControllers");
// const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/editprofile").post(updateUserProfile);

module.exports = router;
