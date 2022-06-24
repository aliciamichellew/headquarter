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

const PostCard = ({ posts, userInfo, handleAddComment }) => {
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
    <div>
      {isPostReady && (
        <Card>
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
              <Typography>{posts.content.title}</Typography>
              <Typography>{posts.content.text}</Typography>
            </Box>
            {posts.comments.slice(0, 3).map((comment) => (
              <Card sx={{ my: 1 }}>
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
                        comment.isAnonymous
                          ? [{ name: "Anonymous", _id: comment.user._id }]
                          : comment.user
                      }
                      content={comment.date}
                    />
                  </Box>
                  <Typography>{comment.text}</Typography>
                </CardContent>
              </Card>
            ))}
          </CardContent>
          <CardActions sx={{ flexDirection: "row", ml: 1 }}>
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
            <Box sx={{ mx: 2 }}>
              <ReplyPostModal
                postId={posts.content._id}
                handleSubmit={handleAddComment}
              />
              {owner && <ReplyPostModal postId={posts.content._id} />}
            </Box>
          </CardActions>
        </Card>
      )}
    </div>
  );
};

export default PostCard;
