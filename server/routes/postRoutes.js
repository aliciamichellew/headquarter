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
  getPostByPostId,
  createPostforInternship,
  editPostInternship,
  deletePostInternship,
  getPostsByInternshipId, 
} = require("../controllers/postControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/add").post(protect, createPosts);
router.route("/edit").put(protect, editPost);
router.route("/delete").delete(protect, deletePost);
router.route("/upvote").put(protect, upvote);
router.route("/unupvote").put(protect, unupvote);
router.route("/upvoteexist").get(protect, upvoteExist);
router.route("/downvote").put(protect, downvote);
router.route("/undownvote").put(protect, undownvote);
router.route("/downvoteexist").get(protect, downvoteExist);
router.route("/comment").put(protect, comment);
router.route("/deletecomment").put(protect, deleteComment);
router.route("/getpostbymodulecode/:moduleCode").get(getPostsByModuleCode);
router.route("/getpostbypostid/:postId").get(getPostByPostId);
router.route("/add2").post(protect, createPostforInternship);
router.route("/edit2").put(protect,  editPostInternship);
router.route("/delete2").put(protect, deletePostInternship);
router.route("/getpostbymodulecode/:moduleCode").get(getPostsByModuleCode);
router.route("/getpostbyinternshipId/:internshipId").get(getPostsByInternshipId);

module.exports = router;
