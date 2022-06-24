import React, { useEffect, useState } from "react";

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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
  const userInfo = localStorage.getItem("userInfo");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);
  const [moduleList, setModuleList] = useState([]);
  const navigate = useNavigate();
  const userInfoJSON = JSON.parse(userInfo);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (!userInfo) {
      navigate("/");
    }
  });

  useEffect(() => {
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
    getModulesInfo();
    getPosts();
  }, [moduleCode]);

  const [page, setPage] = useState(1);
  const PER_PAGE = 5;
  const count = Math.ceil(posts.length / PER_PAGE);
  const _DATA = usePagination(posts, PER_PAGE);

  console.log("posts module", posts);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  useEffect(() => {
    const fetchModules = async () => {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);
      const res = await axios.get("/api/modules", config);
      setModuleList(res.data);
      setLoading(false);
    };
    fetchModules();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      setLoading(true);
      const { data } = await axios.get(
        `/api/modules/${searchQuery}`,
        { searchQuery },
        config
      );

      setModuleList(data);
      setLoading(false);
    } catch (error) {
      throw error.message;
      setLoading(false);
    }
  };

  let users = [{ name: "User 1" }, { name: "User 2" }, { name: "User 3" }];

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

      const currentPosts = posts;
      const { data } = await axios.post(
        "/api/post/add",
        { _id, isAnonymous, text, title, moduleCode },
        config
      );
      currentPosts.push(data);
      setPosts(currentPosts);
    } catch (error) {}
  };

  const handlePaginationChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <TopDrawer open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        theme={theme}
      />
      <Box component="main" sx={{ flexGrow: 1, pt: 0 }}>
        <Grid
          container
          component="main"
          sx={{
            minHeight: "100vh",
            backgroundColor: "#FFCE26",
            display: "flex",
            alignContent: "flex-start",
          }}
        >
          <DrawerHeader />
          <Box
            sx={{
              mb: 4,
              mx: 4,
              mt: 3,
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Card sx={{ backgroundColor: "#1E2328", pl: 2, pt: 1, pb: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
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
                  }}
                >
                  <Button
                    size="large"
                    variant="contained"
                    sx={{
                      mx: 2,
                      color: "#4BB543",
                      outlineColor: "#4BB543",
                      backgroundColor: "white",
                    }}
                  >
                    Experienced
                  </Button>
                  <Button
                    size="large"
                    variant="contained"
                    sx={{
                      mx: 2,
                      color: "#4BB543",
                      outlineColor: "#4BB543",
                      backgroundColor: "white",
                    }}
                  >
                    Added to My Modules
                  </Button>
                  <FormControl
                    sx={{ mx: 2, minWidth: 120, borderColor: "#FFCE26" }}
                  >
                    <InputLabel
                      id="demo-simple-select-helper-label"
                      sx={{ color: "#FFCE26", borderColor: "#FFCE26" }}
                    >
                      Sort
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={sort}
                      label="Sort"
                      onChange={handleChange}
                      sx={{
                        border: "1px solid #FFCE26",
                        color: "#FFCE26",
                        "& .MuiSvgIcon-root": {
                          color: "#FFCE26",
                        },
                      }}
                    >
                      <MenuItem value="">{/* <em>Latest</em> */}</MenuItem>
                      <MenuItem value={"latest"}>Latest</MenuItem>
                      <MenuItem value={"mostliked"}>Most Liked</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Card>

            <Box sx={{ display: "flex", flexDirection: "row", gap: 5, mt: 3 }}>
              <Box>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyItems: "center",
                      width: "70%",
                      mr: 1,
                    }}
                  >
                    <SearchIcon
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                    <TextField
                      id="searchQuery"
                      label="Search by Module Code"
                      variant="standard"
                      sx={{ width: "100%" }}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </Box>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mb: 0,
                      color: "#FFCE26",
                      backgroundColor: "#1E2328",
                      width: "30%",
                      height: 40,
                    }}
                  >
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
                  }}
                >
                  {moduleList.slice(0, 10).map((modules) => (
                    <ModuleButton
                      moduleCode={modules.moduleCode}
                      moduleTitle={modules.title}
                    />
                  ))}
                </Box>
                <Box>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 2,
                      mb: 0,
                      color: "#FFCE26",
                      backgroundColor: "#1E2328",
                      width: "100%",
                      height: 40,
                    }}
                  >
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
                }}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    mb: 3,
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      m: 2,
                      width: "100%",
                    }}
                  >
                    <img
                      src={profile}
                      alt="profile"
                      style={{
                        width: 40,
                        marginRight: 10,
                        borderRadius: "50%",
                      }}
                    />
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
                    alignItems: "flex-start",
                    padding: 0,
                    gap: 3,
                  }}
                >
                  {loading && <CircularProgress />}
                  {_DATA.currentData().map((posts) => (
                    <PostCard posts={posts} userInfo={userInfo} />
                  ))}
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
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{ fontSize: 30, mb: 3 }}>
                  Experienced Users
                </Typography>
                <UserCard users={users} content="AY2021/2022 Semester 2" />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
