const express = require("express");
const {
  createPosts,
  editPost,
  deletePost,
  upvote,
  downvote,
  comment,
  deleteComment,
  getPostsByInternshipCompanyandPosition,
  unupvote,
  undownvote,
  upvoteExist,
  downvoteExist,
  getPostByPostId,
} = require("../controllers/postControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/add2").post(protect, createPosts);
router.route("/edit2").put(protect, editPost);
router.route("/delete2").delete(protect, deletePost);
router.route("/upvote2").put(protect, upvote);
router.route("/unupvote2").put(protect, unupvote);
router.route("/upvoteexist2").get(protect, upvoteExist);
router.route("/downvote2").put(protect, downvote);
router.route("/undownvote2").put(protect, undownvote);
router.route("/downvoteexist2").get(protect, downvoteExist);
router.route("/comment2").put(protect, comment);
router.route("/deletecommen2t").put(protect, deleteComment);
router.route("/getpostbyinternshipcompanyandposition/:companyandposition").get(getPostsByInternshipCompanyandPosition);
router.route("/getpostbypostid/:postId").get(getPostByPostId);

module.exports = router;