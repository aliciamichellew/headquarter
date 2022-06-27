const express = require("express");
const {
    findInternship,
    findInternshipbyCompany,
    findInternshipbyPosition,
    findInternshipbyPositionandCompany,
    userFollowInternship,
    findInternshipSearchQueryMyInternships,
    getMyInternship,
    getInternship
  } = require("../controllers/InternshipController");

const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").get(getInternship);
router.route("/searchInternship/:company").get(findInternshipbyCompany);
router.route("/searchInternship/:position").get(findInternshipbyPosition);
router.route("/searchInternship/:positionandcompany").get(findInternshipbyPositionandCompany);
router.route("/myinternship/:userId").get(protect, getMyInternship);
router.route("/checkinternship").get(protect, userFollowInternship);
router.route("/allinternship/:searchQuery").get(findInternship);
router
  .route("/myinternship/search/:userId/:searchQuery")
  .get(findInternshipSearchQueryMyInternships);

module.exports = router;