import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, Typography, Button } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

import axios from "axios";

import TopDrawer from "../components/drawer/TopNav";
import SideDrawer from "../components/drawer/SideNav";
import PostCard from "./PostCard";
import { ArrowBack } from "@mui/icons-material";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function CommentPage() {
  const { postId } = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState();
  const navigate = useNavigate();

  const getPost = async () => {
    setLoading(true);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      `/api/post/getpostbypostid/${postId}`,
      { postId },
      config
    );

    setPost(data);
    setLoading(false);
  };

  const handleAddComment = async (event, postId, userId, text, isAnonymous) => {
    event.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { res } = await axios({
        method: "put",
        url: "/api/post/comment",
        data: {
          post: { _id: postId },
          comment: { author: userId, text: text, isAnonymous: isAnonymous },
        },
      });

      await getPost();
    } catch (error) {}
  };

  const handleDeleteComment = async (event, postId, commentId) => {
    event.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { res } = await axios({
        method: "put",
        url: "/api/post/deletecomment",
        data: {
          post: { _id: postId },
          comment: { _id: commentId },
        },
      });

      await getPost();
    } catch (error) {}
  };

  const handleEditPost = async (event, postId, isAnonymous, text, title) => {
    event.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { res } = await axios({
        method: "put",
        url: "/api/post/edit",
        data: {
          post: {
            _id: postId,
            isAnonymous: isAnonymous,
            text: text,
            title: title,
          },
        },
      });

      await getPost();
    } catch (err) {}
  };

  const handleDeletePost = async (event, postId) => {
    event.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { res } = await axios({
        method: "delete",
        url: "/api/post/delete",
        data: {
          post: {
            _id: postId,
          },
        },
      });

      await getPost();
    } catch (err) {}
  };

  useEffect(() => {
    getPost();
  }, []);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    if (post.content.company && post.content.position) {
      navigate(`/internships/${post.content.internshipId}`);
    } else {
      navigate(`/modules/${post.content.moduleCode}`);
    }
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <TopDrawer
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          isHomePage={false}
        />
        <SideDrawer
          open={open}
          handleDrawerClose={handleDrawerClose}
          theme={theme}
        />
        <Box component='main' sx={{ flexGrow: 1, pt: 3 }}>
          <Grid
            container
            component='main'
            sx={{
              minHeight: "100vh",
              backgroundColor: "#FFCE26",
              display: "flex",
              alignContent: "flex-start",
            }}>
            <DrawerHeader />
            <Box
              sx={{
                mb: 4,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
                overflow: "auto",
              }}>
              {post && (
                <Button
                  size='large'
                  sx={{
                    color: "#1E2328",
                    my: 0.5,
                    textAlign: "left",
                    ":hover": {
                      bgcolor: "#FFCE26",
                    },
                  }}
                  style={{ justifyContent: "flex-start" }}
                  onClick={handleBack}
                  startIcon={<ArrowBack />}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography fontSize={20}>Back</Typography>
                  </Box>
                </Button>
              )}
              {post && (
                <PostCard
                  posts={post}
                  handleAddComment={handleAddComment}
                  handleEditPost={handleEditPost}
                  handleDeletePost={handleDeletePost}
                  handleDeleteComment={handleDeleteComment}
                  showComment={true}
                />
              )}
            </Box>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}
