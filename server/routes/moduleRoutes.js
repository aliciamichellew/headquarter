const express = require("express");
const {
  registerModule,
  findModule,
  getModuleList,
  getModulefromNUSMODS,
} = require("../controllers/moduleControllers");
const router = express.Router();

router.route("/registermodule").post(registerModule);
router.route("/:searchQuery").get(findModule);
// router.route("/getmodulelist").get(getModuleList);
router.route("/").get(getModulefromNUSMODS);

module.exports = router;
