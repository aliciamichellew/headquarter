const express = require("express");
const {
  createPosts,
  editPost,
  deletePost,
  upvote,
  downvote,
  comment,
  deleteComment,
} = require("../controllers/postControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/add").post(createPosts);
router.route("/edit").put(protect, editPost);
router.route("/delete").delete(protect, deletePost);
router.route("/upvote").put(protect, upvote);
router.route("/downvote").put(protect, downvote);
router.route("/comment").put(protect, comment);
router.route("/deletecomment").put(protect, deleteComment);

module.exports = router;