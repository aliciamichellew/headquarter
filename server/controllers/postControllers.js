const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const Modules = require("../models/moduleModel");
const Post = require("../models/questionModel");
const { post } = require("../routes/userRoutes");

const findUserById = async (request, response) => {
  try {
    const { _id } = request.body;

    const user = await User.findOne({ _id });

    if (user) {
      response.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
      });
    } else {
      response.status(400);
      throw new Error("No Users Found!");
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error occured when finding user by email" });
  }
};

const createPosts = async (req, res) => {
  try {
    console.log(req.headers);
    console.log(req.body.moduleCode);
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
      const moduleUpdated = await Modules.updateOne(
        {
          _id: newModule._id,
        },
        {
          $push: { posts: postId },
        }
      );

      console.log("newModule", newModule);
    } else {
      const moduleUpdated = await Modules.updateOne(
        {
          _id: moduleExists._id,
        },
        {
          $push: { posts: postId },
        }
      );
      console.log("moduleUpdated", moduleUpdated);
    }

    if (post) {
      res.status(201).json({
        user: post.user,
        isAnonymous: post.isAnonymous,
        text: post.text,
        title: post.title,
        moduleCode: post.moduleCode,
        date: post.date,
      });
    } else {
      res.status(400).send({ message: "Error occured when creating new post" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error occured when creating new post" });
  }
};

const editPost = async (req, res) => {
  try {
    const newPost = req.body.post;
    console.log(newPost);

    const postExist = await Post.findOne({
      _id: newPost._id,
    });

    if (!postExist) {
      res.status(400).send({ message: "Post does not exist" });
      return;
    }

    if (
      newPost.hasOwnProperty("user") ||
      newPost.hasOwnProperty("moduleCode")
    ) {
      res.status(400).send({ message: "Cannot update user or module" });
      return;
    }

    const post = await Post.findOneAndUpdate(
      {
        _id: newPost._id,
      },
      newPost,
      { new: true }
    );

    console.log("post", post);
    res.status(200).send({ message: "Update post success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error occured when updating post" });
  }
};

const deletePost = async (req, res) => {
  try {
    const deletePost = req.body.post;

    const postExist = await Post.findOne({
      _id: deletePost._id,
    });

    if (!postExist) {
      res.status(400).send({ message: "Post does not exist" });
      return;
    }

    const post = await Post.findOneAndDelete({
      _id: deletePost._id,
    });

    console.log(deletePost._id);
    const postModuleExist = await Modules.findOne({
      posts: deletePost._id,
    });
    console.log(postModuleExist);

    if (postModuleExist) {
      console.log("post Module exist");
      const postModuleRemove = await Modules.updateOne(
        {
          _id: postModuleExist._id,
        },
        {
          $pull: { posts: deletePost._id },
        }
      );
      console.log(postModuleRemove);
    }

    console.log("post", post);
    res.status(200).send({ message: "Delete post success" });
  } catch (error) {
    console.log(error);
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
      console.log("downvote exist");
      const upvoteRemove = await Post.updateOne(
        {
          _id: upvotePost._id,
        },
        {
          $pull: { downvote: upvotePost.userId },
        }
      );
      console.log(upvoteRemove);
    }

    const upvoteNew = await Post.updateOne(
      {
        _id: upvotePost._id,
      },
      {
        $push: { upvote: upvotePost.userId },
      }
    );

    console.log("upvote", upvoteNew);
    res.status(200).send({ message: "Upvote post success" });
  } catch (error) {
    console.log(error);
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
      const upvoteRemove = await Post.updateOne(
        {
          _id: upvotePost._id,
        },
        {
          $pull: { upvote: upvotePost.userId },
        }
      );
    }
    res.status(200).send({ message: "Unupvoting post success" });
  } catch (error) {
    console.log(error);
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
    //   console.log("upvote", upvoteNew);
    //   res.status(200).send({ message: "Upvote post success" });
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
      console.log("upvote exist");
      const upvoteRemove = await Post.updateOne(
        {
          _id: downvotePost._id,
        },
        {
          $pull: { upvote: downvotePost.userId },
        }
      );
      console.log(upvoteRemove);
    }

    const downvoteNew = await Post.updateOne(
      {
        _id: downvotePost._id,
      },
      {
        $push: { downvote: downvotePost.userId },
      }
    );

    console.log("downvote", downvoteNew);
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
      const upvoteRemove = await Post.updateOne(
        {
          _id: downvotePost._id,
        },
        {
          $pull: { downvote: downvotePost.userId },
        }
      );
    }
    res.status(200).send({ message: "Undownvote post success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error occured when undownvoting post" });
  }
};

const downvoteExist = async (req, res) => {
  try {
    // console.log(req);
    const downvotePost = req.query;
    console.log("downvotePost", downvotePost);

    const postExist = await Post.findOne({
      _id: downvotePost.postId,
    });

    console.log("postExist", postExist);
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
    //   console.log("upvote", upvoteNew);
    //   res.status(200).send({ message: "Upvote post success" });
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
    console.log(newComment);
    const postDetails = req.body.post;
    console.log(postDetails);

    const postExist = await Post.findOne({
      _id: postDetails._id,
    });

    if (!postExist) {
      res.status(400).send({ message: "Post does not exist" });
      return;
    }

    const updatedPost = await Post.updateOne(
      {
        _id: postDetails._id,
      },
      {
        $push: { answers: newComment },
      }
    );

    console.log("updatedPost", updatedPost);
    res.status(200).send({ message: "Post comment success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error occured when commenting post" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const commentDetails = req.body.comment;
    const postDetails = req.body.post;

    const postExist = await Post.findOne({
      _id: postDetails._id,
    });

    if (!postExist) {
      res.status(400).send({ message: "Post does not exist" });
      return;
    }

    const commentExist = await Post.find({
      _id: postDetails._id,
      answers: { _id: commentDetails._id },
    });

    console.log(commentExist);

    if (commentExist.length == 0) {
      res.status(400).send({ message: "Comment does not exist" });
      return;
    }

    const updatedPost = await Post.updateOne(
      {
        _id: postDetails._id,
      },
      {
        $pull: { answers: { _id: commentDetails._id } },
      }
    );

    console.log("updatedPost", updatedPost);
    res.status(200).send({ message: "Delete comment success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error occured when deleting comment" });
  }
};

const getPostsByModuleCode = async (req, res) => {
  try {
    const { moduleCode } = req.params;

    const findModule = await Modules.find({
      moduleCode: moduleCode.toUpperCase(),
    });
    const postArray = [];

    if (findModule.length != 0) {
      //   console.log(findModule[0]);

      const postIds = findModule[0].posts;
      //   console.log(postIds);

      for (var item of postIds) {
        const findPost = await Post.find({ _id: item._id });
        // console.log(findPost[0].user);
        const findUser = await User.find({ _id: findPost[0].user });

        const comments = [];
        if (findPost[0].answers.length != 0) {
          for (var i of findPost[0].answers) {
            const commentUser = await User.find({ _id: i.author });
            var commentData = {
              user: [
                {
                  _id: commentUser[0]._id,
                  name:
                    commentUser[0].firstName + " " + commentUser[0].lastName,
                },
              ],
              text: i.text,
              date: i.date,
              isAnonymous: i.isAnonymous,
            };
            comments.push(commentData);
          }
        }
        var data = {
          user: [
            {
              _id: findUser[0]._id,
              name: findUser[0].firstName + " " + findUser[0].lastName,
            },
          ],
          content: {
            _id: findPost[0]._id,
            title: findPost[0].title,
            text: findPost[0].text,
            upvote: findPost[0].upvote,
            downvote: findPost[0].downvote,
            moduleCode: findPost[0].moduleCode,
            date: findPost[0].date,
            isAnonymous: findPost[0].isAnonymous,
          },
          comments: comments,
        };
        // console.log("data", data);
        postArray.push(data);
      }
    }

    // console.log(postArray);
    // res.status(200).send({ message: "Get posts by module code success" });
    res.json(postArray);
  } catch (error) {
    console.log(error);
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
