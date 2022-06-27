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

const CommentCard = ({ postId, comment, userInfo, handleDeleteComment }) => {
  const owner = userInfo._id === comment.user[0]._id;

  console.log(postId);

  const post = { postId: postId, comment: comment };

  return (
    <Box>
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
        <CardActions sx={{ flexDirection: "row", ml: 1 }}>
          <Box sx={{ mx: 2, display: "flex", flexDirection: "row" }}>
            {owner && (
              <DeletePostModal
                post={post}
                isComment={true}
                handleSubmit={handleDeleteComment}
              />
            )}
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};

export default CommentCard;
