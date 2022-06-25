import React, { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import UserCard from "../components/users/UserCard";
import {
  BookmarkBorderOutlined,
  ThumbUpOutlined,
  ThumbDownOutlined,
  ThumbUp,
  ThumbDown,
} from "@mui/icons-material";

import ReplyPostModal from "./ReplyPostModal";

import axios from "axios";
import EditPostModal from "./EditPostModal";
import DeletePostModal from "./DeletePostModal";
import CommentCard from "./CommentCard";

const PostCard = ({
  posts,
  userInfo,
  handleAddComment,
  handleEditPost,
  handleDeletePost,
  handleDeleteComment,
}) => {
  const [upvote, setUpvote] = useState();
  const [downvote, setDownvote] = useState();
  const userInfoJSON = JSON.parse(userInfo);
  const [isPostReady, setIsPostReady] = useState(false);

  const owner = userInfoJSON._id === posts.user[0]._id;

  useEffect(() => {
    var checkdata = {
      post: {
        _id: posts.content._id,
        userId: userInfoJSON._id,
      },
    };

    const checkUpvote = async () => {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        params: {
          postId: posts.content._id,
          userId: userInfoJSON._id,
        },
      };
      const { data } = await axios.get(`/api/post/upvoteexist`, config);
      setUpvote(data);
    };

    const checkDownvote = async () => {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        params: {
          postId: posts.content._id,
          userId: userInfoJSON._id,
        },
      };
      const { data } = await axios.get(`/api/post/downvoteexist`, config);
      setDownvote(data);
      setIsPostReady(true);
    };

    checkUpvote();
    checkDownvote();
  }, []);

  const handleChangeUpvote = async (e) => {
    if (!upvote) {
      const { res } = await axios({
        method: "put",
        url: "/api/post/upvote",
        data: {
          post: { _id: posts.content._id, userId: userInfoJSON._id },
        },
      });
      setUpvote(true);
      setDownvote(false);
    } else {
      const { res } = await axios({
        method: "put",
        url: "/api/post/unupvote",
        data: {
          post: { _id: posts.content._id, userId: userInfoJSON._id },
        },
      });
      setUpvote(false);
    }
  };

  const handleChangeDownvote = async (e) => {
    if (!downvote) {
      const { res } = await axios({
        method: "put",
        url: "/api/post/downvote",
        data: {
          post: { _id: posts.content._id, userId: userInfoJSON._id },
        },
      });
      setUpvote(false);
      setDownvote(true);
    } else {
      const { res } = await axios({
        method: "put",
        url: "/api/post/undownvote",
        data: {
          post: { _id: posts.content._id, userId: userInfoJSON._id },
        },
      });
      setDownvote(false);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {isPostReady && (
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
                mb: 2,
              }}
            >
              <UserCard
                users={
                  posts.content.isAnonymous
                    ? [{ name: "Anonymous", _id: posts.user._id }]
                    : posts.user
                }
                content={posts.content.date}
              />
              <BookmarkBorderOutlined />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={25} sx={{ mb: 1 }}>
                {posts.content.title}
              </Typography>
              <Typography sx={{ mb: 1 }}>{posts.content.text}</Typography>
            </Box>
            {posts.comments.slice(0, 3).map((comment) => (
              <CommentCard
                postId={posts.content._id}
                comment={comment}
                userInfo={userInfoJSON}
                handleDeleteComment={handleDeleteComment}
              />
            ))}
          </CardContent>
          <CardActions sx={{ flexDirection: "row", ml: 1 }}>
            <Box sx={{ mx: 2, display: "flex", flexDirection: "row" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<ThumbUpOutlined />}
                    checkedIcon={<ThumbUp />}
                    checked={upvote ? upvote : false}
                    onChange={handleChangeUpvote}
                  />
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<ThumbDownOutlined />}
                    checkedIcon={<ThumbDown />}
                    checked={downvote ? downvote : false}
                    onChange={handleChangeDownvote}
                  />
                }
              />
              <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
                <ReplyPostModal
                  postId={posts.content._id}
                  handleSubmit={handleAddComment}
                />
                {owner && (
                  <EditPostModal post={posts} handleSubmit={handleEditPost} />
                )}
                {owner && (
                  <DeletePostModal
                    post={posts}
                    isComment={false}
                    handleSubmit={handleDeletePost}
                  />
                )}
              </Box>
            </Box>
          </CardActions>
        </Card>
      )}
    </Box>
  );
};

export default PostCard;
