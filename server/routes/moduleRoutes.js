const express = require("express");
const {
  findModule,
  getModulefromNUSMODS,
  findModulebyModuleCode,
  getMyModules,
  userFollowModule,
  findModuleSearchQueryMyModules,
  userExperiencedModule,
  getModuleTaken,
} = require("../controllers/moduleControllers");
// const { followModule } = require("../controllers/profileControllers");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(getModulefromNUSMODS);
router.route("/searchModules/:moduleCode").get(findModulebyModuleCode);
router.route("/mymodules/:userId").get(protect, getMyModules);
router.route("/moduleTaken/:userId").get(protect, getModuleTaken);
router.route("/checkfollowmodule").get(protect, userFollowModule);
router.route("/checkexperiencedmodule").get(protect, userExperiencedModule);
router.route("/allmodules/:searchQuery").get(findModule);
router
  .route("/mymodules/search/:userId/:searchQuery")
  .get(findModuleSearchQueryMyModules);

module.exports = router;
