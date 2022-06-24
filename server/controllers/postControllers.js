const User = require("../models/userModel");
const Modules = require("../models/moduleModel");
const Post = require("../models/questionModel");
const { getUserIdFromToken } = require("../middlewares/authMiddleware");

const formatToken = (previous) => {
  return previous.split(" ")[1];
};

const addPostToModule = async (moduleId, postId) => {
  const moduleUpdated = await Modules.updateOne(
    {
      _id: moduleId,
    },
    {
      $push: { posts: postId },
    }
  );
  return moduleUpdated;
};

const editPostField = async (id, op, key, value) => {
  await Post.updateOne(
    {
      _id: id,
    },
    {
      [op]: { [key]: value },
    }
  );
};

const getPostReturnFormat = (user, post, comments) => {
  const data = {
    user: [
      {
        _id: user._id,
        name: user.firstName + " " + user.lastName,
      },
    ],
    content: {
      _id: post._id,
      title: post.title,
      text: post.text,
      upvote: post.upvote,
      downvote: post.downvote,
      moduleCode: post.moduleCode,
      date: post.date,
      isAnonymous: post.isAnonymous,
    },
    comments: comments,
  };
  return data;
};

const getAllComments = async (answers) => {
  const comments = [];
  for (let i of answers) {
    const commentUser = await User.findOne({ _id: i.author });
    let commentData = {
      user: [
        {
          _id: commentUser._id,
          name: commentUser.firstName + " " + commentUser.lastName,
        },
      ],
      text: i.text,
      date: i.date,
      isAnonymous: i.isAnonymous,
    };
    comments.push(commentData);
  }
  return comments;
};

const createPosts = async (req, res) => {
  try {
    const post = await Post.create({
      user: req.body._id,
      isAnonymous: req.body.isAnonymous,
      text: req.body.text,
      title: req.body.title,
      moduleCode: req.body.moduleCode,
      date: Date.now(),
    });
    const moduleCode = req.body.moduleCode;
    const moduleExists = await Modules.findOne({ moduleCode });
    const postId = post._id;

    if (!moduleExists) {
      const newModule = await Modules.create({
        moduleCode: moduleCode,
      });
      await addPostToModule(newModule._id, postId);
    } else {
      await addPostToModule(moduleExists._id, postId);
    }

    const findUser = await User.find({ _id: post.user });
    const returnFormat = getPostReturnFormat(findUser, post, []);

    if (post) {
      res.status(201).json(returnFormat);
    } else {
      res.status(400).send({ message: "Error occured when creating new post" });
      return;
    }
  } catch (error) {
    res.status(400).send({ message: "Error occured when creating new post" });
  }
};

const editPost = async (req, res) => {
  try {
    const newPost = req.body.post;

    const postExist = await Post.findOne({
      _id: newPost._id,
    });

    // Checks if there's an existent post
    if (!postExist) {
      res.status(400).send({ message: "Post does not exist" });
      return;
    }

    // Checks if user is trying to change user or module code which is not allowed
    if (
      newPost.hasOwnProperty("user") ||
      newPost.hasOwnProperty("moduleCode")
    ) {
      res.status(400).send({ message: "Cannot update user or module" });
      return;
    }

    await Post.findOneAndUpdate(
      {
        _id: newPost._id,
      },
      newPost,
      { new: true }
    );

    res.status(200).send({ message: "Update post success" });
  } catch (error) {
    res.status(400).send({ message: "Error occured when updating post" });
  }
};

const deletePost = async (req, res) => {
  try {
    const deletePost = req.body.post;
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      res.status(400).send({ message: "Token required" });
      return;
    }

    const userId = await getUserIdFromToken(token);
    const postExist = await Post.findOne({
      _id: deletePost._id,
    });

    if (!postExist) {
      res.status(400).send({ message: "Post does not exist" });
      return;
    }

    if (postExist.user != userId) {
      res.status(400).send({ message: "User unauthorized" });
      return;
    }

    const post = await Post.findOneAndDelete({
      _id: deletePost._id,
    });

    const postModuleExist = await Modules.findOne({
      posts: deletePost._id,
    });

    if (postModuleExist) {
      await Modules.updateOne(
        {
          _id: postModuleExist._id,
        },
        {
          $pull: { posts: deletePost._id },
        }
      );
    }

    res.status(200).send({ message: "Delete post success" });
  } catch (error) {
    res.status(400).send({ message: "Error occured when deleting post" });
  }
};

const upvote = async (req, res) => {
  try {
    const upvotePost = req.body.post;

    const postExist = await Post.findOne({
      _id: upvotePost._id,
    });

    if (!postExist) {
      res.status(400).send({ message: "Post does not exist" });
      return;
    }

    const upvoteExist = await Post.findOne({
      _id: upvotePost._id,
      upvote: upvotePost.userId,
    });

    if (upvoteExist) {
      res.status(400).send({ message: "User has upvoted" });
      return;
    }

    const downvoteExist = await Post.findOne({
      _id: upvotePost._id,
      downvote: upvotePost.userId,
    });

    if (downvoteExist) {
      await editPostField(
        upvotePost._id,
        "$pull",
        "downvote",
        upvotePost.userId
      );
    }

    await editPostField(upvotePost._id, "$push", "upvote", upvotePost.userId);
    res.status(200).send({ message: "Upvote post success" });
  } catch (error) {
    res.status(400).send({ message: "Error occured when upvoting post" });
  }
};

const unupvote = async (req, res) => {
  try {
    const upvotePost = req.body.post;
    const postExist = await Post.findOne({
      _id: upvotePost._id,
    });

    if (!postExist) {
      res.status(400).send({ message: "Post does not exist" });
      return;
    }

    const upvoteExist = await Post.findOne({
      _id: upvotePost._id,
      upvote: upvotePost.userId,
    });

    if (!upvoteExist) {
      res.status(400).send({ message: "User has not upvoted" });
      return;
    } else {
      await editPostField(
        upvotePost._id,
        "$pull",
        "downvote",
        upvotePost.userId
      );
    }
    res.status(200).send({ message: "Unupvoting post success" });
  } catch (error) {
    res.status(400).send({ message: "Error occured when unupvoting post" });
  }
};

const upvoteExist = async (req, res) => {
  try {
    const upvotePost = req.query;
    console.log(upvotePost);

    const postExist = await Post.findOne({
      _id: upvotePost.postId,
    });

    if (!postExist) {
      res.status(400).send({ message: "Post does not exist" });
      return;
    }

    const upvoteExist = await Post.findOne({
      _id: upvotePost.postId,
      upvote: upvotePost.userId,
    });

    let upvoted = false;
    if (upvoteExist) {
      upvoted = true;
    } else {
      upvoted = false;
    }

    res.json(upvoted);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: "Error occured when checking upvote post" });
  }
};

const downvote = async (req, res) => {
  try {
    const downvotePost = req.body.post;

    const postExist = await Post.findOne({
      _id: downvotePost._id,
    });

    if (!postExist) {
      res.status(400).send({ message: "Post does not exist" });
      return;
    }

    const downvoteExist = await Post.findOne({
      _id: downvotePost._id,
      downvote: downvotePost.userId,
    });

    if (downvoteExist) {
      res.status(400).send({ message: "User has downvoted" });
      return;
    }

    const upvoteExist = await Post.findOne({
      _id: downvotePost._id,
      upvote: downvotePost.userId,
    });

    if (upvoteExist) {
      await editPostField(
        downvotePost._id,
        "$pull",
        "upvote",
        downvotePost.userId
      );
    }

    await editPostField(
      downvotePost._id,
      "$push",
      "downvote",
      downvotePost.userId
    );
    res.status(200).send({ message: "Downvote post success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error occured when downvoting post" });
  }
};

const undownvote = async (req, res) => {
  try {
    const downvotePost = req.body.post;

    const postExist = await Post.findOne({
      _id: downvotePost._id,
    });

    if (!postExist) {
      res.status(400).send({ message: "Post does not exist" });
      return;
    }

    const downvoteExist = await Post.findOne({
      _id: downvotePost._id,
      downvote: downvotePost.userId,
    });

    if (!downvoteExist) {
      res.status(400).send({ message: "User has not downvoted" });
      return;
    } else {
      await editPostField(
        downvotePost._id,
        "$pull",
        "downvote",
        downvotePost.userId
      );
    }
    res.status(200).send({ message: "Undownvote post success" });
  } catch (error) {
    res.status(400).send({ message: "Error occured when undownvoting post" });
  }
};

const downvoteExist = async (req, res) => {
  try {
    const downvotePost = req.query;
    const postExist = await Post.findOne({
      _id: downvotePost.postId,
    });

    if (!postExist) {
      res.status(400).send({ message: "Post does not exist" });
      return;
    }

    const downvoteExist = await Post.findOne({
      _id: downvotePost.postId,
      downvote: downvotePost.userId,
    });

    let downvoted = false;
    if (downvoteExist) {
      downvoted = true;
    } else {
      downvoted = false;
    }

    res.json(downvoted);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: "Error occured when checking downvote post" });
  }
};

const comment = async (req, res) => {
  try {
    const newComment = req.body.comment;
    const postDetails = req.body.post;

    const postExist = await Post.findOne({
      _id: postDetails._id,
    });

    if (!postExist) {
      res.status(400).send({ message: "Post does not exist" });
      return;
    }

    await editPostField(postDetails._id, "$push", "answers", newComment);
    res.status(200).send({ message: "Post comment success" });
  } catch (error) {
    res.status(400).send({ message: "Error occured when commenting post" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { comment, post } = req.body;

    const postExist = await Post.findOne({
      _id: post._id,
    });

    if (!postExist) {
      res.status(400).send({ message: "Post does not exist" });
      return;
    }

    const commentExist = await Post.find({
      _id: post._id,
      answers: { _id: comment._id },
    });

    if (commentExist.length === 0) {
      res.status(400).send({ message: "Comment does not exist" });
      return;
    }

    await editPostField(post._id, "$pull", "answers", comment._id);
    res.status(200).send({ message: "Delete comment success" });
  } catch (error) {
    res.status(400).send({ message: "Error occured when deleting comment" });
  }
};

const getPostsByModuleCode = async (req, res) => {
  try {
    const { moduleCode } = req.params;

    const findModule = await Modules.findOne({
      moduleCode: moduleCode.toUpperCase(),
    });
    if (!findModule) {
      res.status(400).send({ message: "Module does not exist" });
      return;
    }

    const posts = [];
    const postIds = findModule.posts;
    if (postIds.length !== 0) {
      for (var item of postIds) {
        const findPost = await Post.findOne({ _id: item._id });
        if (!findPost) {
          res.status(400).send({ message: "Post does not exist" });
          return;
        }

        const findUser = await User.findOne({ _id: findPost.user });
        if (!findPost) {
          res.status(400).send({ message: "User does not exist" });
          return;
        }

        const comments = await getAllComments(findPost.answers);
        posts.push(getPostReturnFormat(findUser, findPost, comments));
      }
    }

    res.status(200).json(posts);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error occured when getting posts by module code" });
  }
};

module.exports = {
  createPosts,
  editPost,
  deletePost,
  upvote,
  unupvote,
  upvoteExist,
  downvote,
  undownvote,
  downvoteExist,
  comment,
  deleteComment,
  getPostsByModuleCode,
};
