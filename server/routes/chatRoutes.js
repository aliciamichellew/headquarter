const express = require("express");
const {
    accessChat,
    fetchChat,
  } = require("../controller/chatController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/:userId").post(protect, accessChat);
router.route("/:userId").get(protect, fetchChat);

module.exports = router;