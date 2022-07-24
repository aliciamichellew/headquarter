const express = require("express");
const {
  allMessages, 
  sendMessage
} = require("../controller/messageController");
//const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/:userId/:chatId").get(allMessages);
router.route("/:userId").post(sendMessage);

module.exports = router;