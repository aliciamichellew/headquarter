const express = require("express");
const {
  createPosts,
  editPost,
  deletePost,
  upvote,
  downvote,
  comment,
  deleteComment,
  getPostsByModuleCode,
  unupvote,
  undownvote,
  upvoteExist,
  downvoteExist,
} = require("../controllers/postControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/add").post(createPosts);
router.route("/edit").put(editPost);
router.route("/delete").delete(deletePost);
router.route("/upvote").put(upvote);
router.route("/unupvote").put(unupvote);
router.route("/upvoteexist").get(upvoteExist);
router.route("/downvote").put(downvote);
router.route("/undownvote").put(undownvote);
router.route("/downvoteexist").get(downvoteExist);
router.route("/comment").put(comment);
router.route("/deletecomment").put(protect, deleteComment);
router.route("/getpostbymodulecode/:moduleCode").get(getPostsByModuleCode);

module.exports = router;
