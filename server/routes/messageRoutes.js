const express = require("express");
const {
  allMessages, 
  sendMessage
} = require("../controllers/messageController");
//const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/:chatId").get(allMessages);
router.route("/:userId").post(sendMessage);

module.exports = router;