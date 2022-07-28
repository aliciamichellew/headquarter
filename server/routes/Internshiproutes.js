const express = require("express");
const {
  createInternship,
  fetchInternship,
  findInternshipbyCompanyorPosition,
  getMyInternship,
  getInternshipTaken,
  userFollowInternship,
  findInternshipSearchQueryMyInternships,
  userExperiencedInternship,
  findInternshipbyId,
  findInternshipbyCompanyandPosition,
  getUserExperience,
} = require("../controllers/InternshipController");

const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").post(createInternship);
router.route("/").get(fetchInternship);
router.route("/searchInternship/").get(findInternshipbyCompanyorPosition);
router.route("/getInternship/").get(findInternshipbyCompanyandPosition);
router.route("/fetchInternship/:id").get(findInternshipbyId);
router.route("/myinternships/:userId").get(protect, getMyInternship);
router.route("/InternshipTaken/:userId").get(protect, getInternshipTaken);
router.route("/checkinternship").get(protect, userFollowInternship);
router.route("/experiencedinterns").get(userExperiencedInternship);
router.route("/userExperience/:id").get(getUserExperience);
//router.route("/allinternship/:searchQuery").get(findInternshipSearchQuery);
router
  .route("/myinternships/search/:userId/:searchQuery")
  .get(findInternshipSearchQueryMyInternships);

module.exports = router;
