import React, { useContext, useEffect, useState } from "react";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import UserCard from "../components/users/UserCard";
import {
  BookmarkBorderOutlined,
  ThumbUpOutlined,
  ThumbDownOutlined,
  ThumbUp,
  ThumbDown,
  CommentOutlined,
} from "@mui/icons-material";

import ReplyPostModal from "./ReplyPostModal";

import axios from "axios";
import EditPostModal from "./EditPostModal";
import DeletePostModal from "./DeletePostModal";
import CommentCard from "./CommentCard";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";

const PostCard = ({
  posts,
  handleAddComment,
  handleEditPost,
  handleDeletePost,
  handleDeleteComment,
  showComment,
}) => {
  const [upvote, setUpvote] = useState();
  const [downvote, setDownvote] = useState();
  const { userInfo } = useContext(UserContext);
  const userId = userInfo ? userInfo._id : null;
  const [isPostReady, setIsPostReady] = useState(false);
  const navigate = useNavigate();

  const owner = userId === posts.user._id;

  useEffect(() => {
    var checkdata = {
      post: {
        _id: posts.content._id,
        userId: userId,
      },
    };

    const checkUpvote = async () => {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        params: {
          postId: posts.content._id,
          userId: userId,
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
          userId: userId,
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
          post: { _id: posts.content._id, userId: userId },
        },
      });
      setUpvote(true);
      setDownvote(false);
    } else {
      const { res } = await axios({
        method: "put",
        url: "/api/post/unupvote",
        data: {
          post: { _id: posts.content._id, userId: userId },
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
          post: { _id: posts.content._id, userId: userId },
        },
      });
      setUpvote(false);
      setDownvote(true);
    } else {
      const { res } = await axios({
        method: "put",
        url: "/api/post/undownvote",
        data: {
          post: { _id: posts.content._id, userId: userId },
        },
      });
      setDownvote(false);
    }
  };

  if (!userId) {
    navigate("/");
    return <></>;
  }

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
                    ? { name: "Anonymous", _id: posts.user._id }
                    : posts.user
                }
                content={posts.content.date}
              />
              {/* <BookmarkBorderOutlined /> */}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={25} sx={{ mb: 1 }}>
                {posts.content.title}
              </Typography>
              <Typography sx={{ mb: 1 }}>{posts.content.text}</Typography>
            </Box>
            {showComment &&
              posts.comments.map((comment) => (
                <CommentCard
                  postId={posts.content._id}
                  comment={comment}
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
                {showComment && (
                  <ReplyPostModal
                    postId={posts.content._id}
                    handleSubmit={handleAddComment}
                  />
                )}
                {!showComment && (
                  <Button
                    sx={{
                      color: "#1E2328",
                      my: 0.5,
                      textAlign: "left",
                      ":hover": {
                        bgcolor: "#FFCE26",
                      },
                    }}
                    style={{ justifyContent: "flex-start" }}
                    onClick={() => {
                      navigate(`/commentpage/${posts.content._id}`);
                    }}
                    startIcon={<CommentOutlined />}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography>Comment</Typography>
                    </Box>
                  </Button>
                )}
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
