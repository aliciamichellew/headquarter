import React, { useEffect, useState } from "react";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Pagination from "@mui/material/Pagination";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import TopDrawer from "../../components/drawer/TopNav";
import SideDrawer from "../../components/drawer/SideNav";
import UserCard from "../users/UserCard";
import PostCard from "../../posts/PostCard";
import AddPostModal from "../../posts/AddPostModal";
import profile from "../../img/profile.png";
import usePagination from "../utils/Pagination";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function ModulePage(module) {
  let navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (!userInfo) {
      navigate("/");
    }
  });

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const userInfo = localStorage.getItem("userInfo");

  const [sort, setSort] = React.useState("");

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const [loading, setLoading] = useState(false);
  const [moduleList, setModuleList] = useState([]);

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
      console.log(searchQuery);
      const { data } = await axios.get(
        `/api/modules/${searchQuery}`,
        { searchQuery },
        config
      );

      console.log(data);
      setModuleList(data);
      setLoading(false);
    } catch (error) {
      throw error.message;
      setLoading(false);
    }
  };

  let users = [{ name: "User 1" }, { name: "User 2" }, { name: "User 3" }];

  let posts = [
    {
      user: [{ name: "User 1" }],
      content:
        "Exciting news! I’m hiring mid-level and senior Product Designers to join my team at Acme, where we’re building the future of eCommerce.",
      comments: [
        { user: [{ name: "User 2" }], content: "Test reply" },
        { user: [{ name: "User 2" }], content: "Test reply" },
        { user: [{ name: "User 2" }], content: "Test reply" },
        { user: [{ name: "User 2" }], content: "Test reply" },
        { user: [{ name: "User 2" }], content: "Test reply" },
      ],
    },
    {
      user: [{ name: "User 2" }],
      content:
        "Exciting news! I’m hiring mid-level and senior Product Designers to join my team at Acme, where we’re building the future of eCommerce.",
      comments: [{ user: [{ name: "User 2" }], content: "Test reply" }],
    },
    {
      user: [{ name: "User 3" }],
      content:
        "Exciting news! I’m hiring mid-level and senior Product Designers to join my team at Acme, where we’re building the future of eCommerce.",
      comments: [],
    },
    {
      user: [{ name: "User 4" }],
      content:
        "Exciting news! I’m hiring mid-level and senior Product Designers to join my team at Acme, where we’re building the future of eCommerce.",
      comments: [],
    },
    {
      user: [{ name: "User 5" }],
      content:
        "Exciting news! I’m hiring mid-level and senior Product Designers to join my team at Acme, where we’re building the future of eCommerce.",
      comments: [],
    },
    {
      user: [{ name: "User 6" }],
      content:
        "Exciting news! I’m hiring mid-level and senior Product Designers to join my team at Acme, where we’re building the future of eCommerce.",
      comments: [],
    },
  ];

  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(posts.length / PER_PAGE);
  const _DATA = usePagination(posts, PER_PAGE);

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
                    CS1010S
                  </Typography>
                  <Typography sx={{ fontSize: 40, color: "#FFCE26" }}>
                    Programming Methodology
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
                      // mt: 2,
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
                    <Button
                      sx={{
                        color: "#1E2328",
                        my: 0.5,
                        textAlign: "left",
                      }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography>{modules.moduleCode}</Typography>
                        <Typography> {modules.title}</Typography>
                      </Box>
                    </Button>
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
                      // alignItems: "center",
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
                    {/* <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#D4D4D4",
                        color: "#909090",
                        height: 40,
                        width: "100%",
                      }}
                    >
                      Add a new post
                    </Button> */}
                    <AddPostModal sx={{ width: "100%" }} />
                  </Box>
                </Card>
                <PostCard posts={_DATA.currentData()} />
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
