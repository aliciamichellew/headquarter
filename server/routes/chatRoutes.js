const express = require("express");
const {
    accessChat,
    fetchChat,
  } = require("../controllers/chatController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChat);

module.exports = router;