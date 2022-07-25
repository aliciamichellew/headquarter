import React, { useContext, useEffect, useState } from "react";

import { styled, useTheme } from "@mui/material/styles";

import {
  Box,
  Typography,
  Grid,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Card,
  TextField,
  Pagination,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Add, Check } from "@mui/icons-material";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import TopDrawer from "../../components/drawer/TopNav";
import SideDrawer from "../../components/drawer/SideNav";
import UserCard from "../users/UserCard";
import PostCard from "../../posts/PostCard";
import AddPostModal from "../../posts/AddPostModal";
import profile from "../../img/profile.png";
import usePagination from "../utils/Pagination";
import ModuleButton from "./ModuleButton";
import ExperiencedModuleModal from "./ExperiencedModuleModal";
import DeleteExperiencedModuleModal from "./DeleteExperiencedModuleModal";
import ProfileAvatar from "../profile/ProfileAvatar";
import { UserContext } from "../../App";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function ModulePage(module) {
  const { moduleCode } = useParams();
  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState([]);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);
  const [moduleList, setModuleList] = useState([]);
  const navigate = useNavigate();
  const [follow, setFollow] = useState();
  const { userInfo } = useContext(UserContext);
  const userId = userInfo ? userInfo._id : null;
  const [experienced, setExperienced] = useState();
  const [profilePic, setProfilePic] = useState("");
  const [experiencedUserList, setExperiencedUserlist] = useState([]);

  const checkFollow = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        params: {
          moduleCode: moduleCode,
          userId: userId,
        },
      };
      const { data } = await axios.get(
        `/api/modules/checkfollowmodule`,
        config
      );
      setFollow(data);
    } catch (err) {
      // checkTokenValid(err, navigate);
    }
  };

  const checkExperienced = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
      params: {
        moduleCode: moduleCode,
        userId: userId,
      },
    };
    const { data } = await axios.get(
      `/api/modules/checkexperiencedmodule`,
      config
    );
    setExperienced(data);
  };

  const getPosts = async () => {
    setLoading(true);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.get(
      `/api/post/getpostbymodulecode/${moduleCode}`,
      { moduleCode },
      config
    );
    setPosts(data);
    setLoading(false);
  };

  const getModulesInfo = async () => {
    setLoading(true);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.get(
      `/api/modules/searchModules/${moduleCode}`,
      { moduleCode },
      config
    );
    setTitle(data.title);
    setLoading(false);
  };

  const getExperiencedUser = async () => {
    setLoading(true);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.get(
      `/api/modules/getexperiencedusers/${moduleCode}`,
      { moduleCode },
      config
    );
    setExperiencedUserlist(data);
    setLoading(false);
  };

  useEffect(() => {
    getModulesInfo();
    checkFollow();
    checkExperienced();
    getPosts();
    getExperiencedUser();
  }, [moduleCode]);

  const [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const count = Math.ceil(posts.length / PER_PAGE);
  const _DATA = usePagination(posts, PER_PAGE);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    setSort(event.target.value);
  };

  const handleChangeFollow = async e => {
    if (!follow) {
      await axios({
        method: "put",
        url: "/api/profile/followmodule",
        data: {
          moduleCode: moduleCode,
          userId: userId,
        },
      });
      setFollow(true);
    } else {
      await axios({
        method: "put",
        url: "/api/profile/unfollowmodule",
        data: {
          moduleCode: moduleCode,
          userId: userId,
        },
      });
      setFollow(false);
    }
  };

  useEffect(() => {
    const fetchModules = async userId => {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.get(
        `/api/modules/mymodules/${userId}`,
        { userId },
        config
      );
      setModuleList(data);
      setLoading(false);
    };
    const getUserProfile = async userId => {
      try {
        setLoading(false);
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.get(
          `/api/profile/getprofile/${userId}`,
          { userId },
          config
        );
        setProfilePic(data.profilePic || "");
        setLoading(false);
      } catch (err) {}
    };
    if (userId) {
      fetchModules(userId);
      getUserProfile(userId);
    }
  }, [userId]);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      setLoading(true);
      const { data } = await axios.get(
        `/api/modules/mymodules/search/${userId}/${searchQuery}`,
        { userId, searchQuery },
        config
      );

      setModuleList(data);
      setLoading(false);
    } catch (error) {
      throw error.message;
    }
  };

  // let users = [{ name: "User 1" }, { name: "User 2" }, { name: "User 3" }];

  const handleCreatePost = async (
    event,
    _id,
    isAnonymous,
    text,
    title,
    moduleCode
  ) => {
    event.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const currentPosts = [...posts];
      const { data } = await axios.post(
        "/api/post/add",
        { _id, isAnonymous, text, title, moduleCode },
        config
      );
      currentPosts.push(data);
      setPosts(currentPosts);
    } catch (error) {}
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

      await getPosts();
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

      await getPosts();
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

      await getPosts();
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

      await getPosts();
    } catch (err) {}
  };

  const handleExperienced = async (
    event,
    userId,
    moduleCode,
    acadYear,
    semester
  ) => {
    await axios({
      method: "put",
      url: "/api/profile/experiencedmodule",
      data: {
        moduleCode: moduleCode,
        userId: userId,
        acadYear: acadYear,
        semester: semester,
      },
    });
    setExperienced(true);
  };

  const handleRemoveExperienced = async (event, moduleCode) => {
    await axios({
      method: "put",
      url: "/api/profile/unexperiencedmodule",
      data: {
        moduleCode: moduleCode,
        userId: userId,
      },
    });
    setExperienced(false);
  };

  const handlePaginationChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  if (!userInfo || !userId) {
    navigate("/");
    return <></>;
  }

  return (
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
      <Box component='main' sx={{ flexGrow: 1, pt: 0 }}>
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
              mt: 3,
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}>
            <Card sx={{ backgroundColor: "#1E2328", pl: 2, pt: 1, pb: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ fontSize: 40, color: "#FFCE26" }}>
                    {moduleCode.toUpperCase()}
                  </Typography>
                  <Typography sx={{ fontSize: 40, color: "#FFCE26" }}>
                    {title}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    justifyItems: "center",
                    alignItems: "center",
                  }}>
                  {!experienced && (
                    <ExperiencedModuleModal
                      moduleCode={moduleCode}
                      handleExperienced={handleExperienced}
                    />
                  )}
                  {experienced && (
                    <DeleteExperiencedModuleModal
                      moduleCode={moduleCode}
                      handleRemoveExperienced={handleRemoveExperienced}
                    />
                  )}
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<Add sx={{ color: "#FFCE26" }} />}
                        checkedIcon={<Check sx={{ color: "#FFCE26" }} />}
                        checked={follow ? follow : false}
                        onChange={handleChangeFollow}
                      />
                    }
                    label={follow ? "Added to My Modules" : "Add to My Modules"}
                    sx={{ color: "#FFCE26" }}
                  />
                  <FormControl
                    sx={{ mx: 2, minWidth: 120, borderColor: "#FFCE26" }}>
                    <InputLabel
                      id='demo-simple-select-helper-label'
                      sx={{ color: "#FFCE26", borderColor: "#FFCE26" }}>
                      Sort
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-helper-label'
                      id='demo-simple-select-helper'
                      value={sort}
                      label='Sort'
                      onChange={handleChange}
                      sx={{
                        border: "1px solid #FFCE26",
                        color: "#FFCE26",
                        "& .MuiSvgIcon-root": {
                          color: "#FFCE26",
                        },
                      }}>
                      <MenuItem value=''>{/* <em>Latest</em> */}</MenuItem>
                      <MenuItem value={"latest"}>Latest</MenuItem>
                      <MenuItem value={"mostliked"}>Most Liked</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Card>

            <Box sx={{ display: "flex", flexDirection: "row", gap: 5, mt: 3 }}>
              <Box sx={{ width: "25%" }}>
                <Box
                  component='form'
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                  }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyItems: "center",
                      width: "70%",
                      mr: 1,
                    }}>
                    <SearchIcon
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                    <TextField
                      id='searchQuery'
                      label='Search by Module Code'
                      variant='standard'
                      sx={{ width: "100%" }}
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />
                  </Box>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{
                      mb: 0,
                      color: "#FFCE26",
                      backgroundColor: "#1E2328",
                      width: "30%",
                      height: 40,
                    }}>
                    <Typography fontFamily={"Berlin Sans FB"}>
                      Search
                    </Typography>
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    mt: 3,
                    width: "100%",
                  }}>
                  {moduleList.slice(0, 10).map(modules => (
                    <ModuleButton
                      moduleCode={modules.moduleCode}
                      moduleTitle={modules.title}
                    />
                  ))}
                </Box>
                <Box>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{
                      mt: 2,
                      mb: 0,
                      color: "#FFCE26",
                      backgroundColor: "#1E2328",
                      width: "100%",
                      height: 40,
                    }}
                    onClick={() => {
                      navigate("/mymodules");
                    }}>
                    <Typography fontFamily={"Berlin Sans FB"}>
                      View All My Modules
                    </Typography>
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "50%",
                }}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    mb: 3,
                    width: "100%",
                  }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      m: 2,
                      width: "100%",
                      gap: 1,
                    }}>
                    {!profilePic && (
                      <img
                        src={profile}
                        alt='profile'
                        style={{
                          width: 40,
                          marginRight: 5,
                          borderRadius: "50%",
                        }}
                      />
                    )}
                    {profilePic && (
                      <ProfileAvatar profilePic={profilePic} width={40} />
                    )}
                    <AddPostModal
                      moduleCode={moduleCode}
                      handleSubmit={handleCreatePost}
                    />
                  </Box>
                </Card>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 0,
                    gap: 3,
                    width: "100%",
                  }}>
                  {loading && <CircularProgress />}
                  {_DATA.currentData().map(posts => (
                    <PostCard
                      posts={posts}
                      handleAddComment={handleAddComment}
                      handleEditPost={handleEditPost}
                      handleDeletePost={handleDeletePost}
                      handleDeleteComment={handleDeleteComment}
                      showComment={false}
                    />
                  ))}
                  {_DATA.currentData().length == 0 && (
                    <Typography fontSize={40}>No Post Yet!</Typography>
                  )}
                </Box>
                <Pagination
                  count={count}
                  page={page}
                  onChange={handlePaginationChange}
                  showFirstButton
                  showLastButton
                  sx={{ mt: 2 }}
                />
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "25%" }}>
                <Typography sx={{ fontSize: 30, mb: 3 }}>
                  Experienced Users
                </Typography>
                {experiencedUserList.map(users => (
                  <UserCard
                    users={users.user}
                    content={`${users.acadYear}Semester ${users.semester}`}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
