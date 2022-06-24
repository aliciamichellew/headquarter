import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UserCard from "../components/users/UserCard";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import ReplyPostModal from "./ReplyPostModal";

import axios from "axios";

const PostCard = ({ posts, userInfo }) => {
  const [upvote, setUpvote] = useState();
  const [downvote, setDownvote] = useState();
  const userInfoJSON = JSON.parse(userInfo);

  console.log("posts", posts);
  console.log("isAnonymous", posts.content.isAnonymous);

  useEffect(() => {
    var checkdata = {
      post: {
        _id: posts.content._id,
        userId: userInfoJSON._id,
      },
    };

    console.log(checkdata);

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
          <BookmarkBorderOutlinedIcon />
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
              icon={<ThumbUpOutlinedIcon />}
              checkedIcon={<ThumbUpIcon />}
              checked={upvote ? upvote : false}
              onChange={handleChangeUpvote}
            />
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              icon={<ThumbDownOutlinedIcon />}
              checkedIcon={<ThumbDownIcon />}
              checked={downvote ? downvote : false}
              onChange={handleChangeDownvote}
            />
          }
        />
        <Box sx={{ mx: 1 }}>
          <ReplyPostModal postId={posts.content._id} />
        </Box>
      </CardActions>
    </Card>
  );
};

export default PostCard;
