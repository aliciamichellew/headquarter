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

const PostCard = ({ posts, loading }) => {
  if (loading) {
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 0,
        gap: 3,
        // overflow: "auto",
        // flexFlow: "wrap",
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
              <UserCard users={posts.user} content={"Today 4:00"} />
              <BookmarkBorderOutlinedIcon />
            </Box>
            <Typography>{posts.content}</Typography>
          </CardContent>
          <CardActions sx={{ flexDirection: "row", ml: 1 }}>
            <ThumbUpOutlinedIcon />
            <ThumbDownAltOutlinedIcon />
            <Button size="small">Reply</Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default PostCard;
