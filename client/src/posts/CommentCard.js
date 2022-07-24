import React, { useContext } from "react";

import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import UserCard from "../components/users/UserCard";
import DeletePostModal from "./DeletePostModal";
import { UserContext } from "../App";

const CommentCard = ({ postId, comment, handleDeleteComment }) => {
  const { userInfo } = useContext(UserContext);
  const userId = userInfo ? userInfo._id : null;
  const owner = userId === comment.user._id;

  const post = { postId: postId, comment: comment };

  if (!userId) {
    return <></>;
  }

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
            }}>
            <UserCard
              users={
                comment.isAnonymous
                  ? { name: "Anonymous", _id: comment.user._id }
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
