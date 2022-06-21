const express = require("express");
const {
  registerModule,
  findModule,
  getModuleList,
  getModulefromNUSMODS,
  findModulebyModuleCode,
} = require("../controllers/moduleControllers");
const router = express.Router();

router.route("/registermodule").post(registerModule);
router.route("/").get(getModulefromNUSMODS);
router.route("/:searchQuery").get(findModule);
router.route("/searchModules/:moduleCode").get(findModulebyModuleCode);

module.exports = router;
