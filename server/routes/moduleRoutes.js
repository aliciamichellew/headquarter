const express = require("express");
const {
  registerModule,
  findModule,
  getModuleList,
} = require("../controllers/moduleControllers");
const router = express.Router();

router.route("/registermodule").post(registerModule);
router.route("/findmodule").get(findModule);
router.route("/getmodulelist").get(getModuleList);

module.exports = router;
