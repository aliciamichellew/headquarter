import React from "react";

import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import UserCard from "../components/users/UserCard";
import DeletePostModal from "./DeletePostModal";

const CommentCard = ({ postId, comment, userInfo, handleDeleteComment }) => {
  const owner = userInfo._id === comment.user[0]._id;

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
