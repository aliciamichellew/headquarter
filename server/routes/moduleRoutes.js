const express = require("express");
const {
  findModule,
  getModulefromNUSMODS,
  findModulebyModuleCode,
} = require("../controllers/moduleControllers");
const router = express.Router();

router.route("/").get(getModulefromNUSMODS);
router.route("/:searchQuery").get(findModule);
router.route("/searchModules/:moduleCode").get(findModulebyModuleCode);

module.exports = router;
