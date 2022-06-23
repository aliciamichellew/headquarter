import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UserCard from "../components/users/UserCard";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";

import ReplyPostModal from "./ReplyPostModal";

const PostCard = ({ posts, loading }) => {
  if (loading) {
  }
  // console.log("post comments", posts.comments);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 0,
        gap: 3,
      }}
    >
      {posts.map((posts) => (
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
            <ThumbUpOutlinedIcon />
            <ThumbDownAltOutlinedIcon />
            <Box sx={{ mx: 1 }}>
              <ReplyPostModal postId={posts.content._id} />
            </Box>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default PostCard;
