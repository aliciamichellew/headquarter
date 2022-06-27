import { Box, Button, Card, Checkbox, createTheme, FormControl, FormControlLabel, Grid, InputLabel, PostCard, UserCard, MenuItem, Select, Stack, styled, TextField, ThemeProvider, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import SideDrawer from "../drawer/SideNav";
import TopDrawer from "../drawer/TopNav";
import PaginationButtons from "../Pagination";
import {useNavigate} from "react-router-dom"
import axios, { Axios } from "axios";
import {Search} from "@mui/icons-material";

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  }));

  const InternshipButton = ({ company, position }) => {
    let navigate = useNavigate();
    return (
      <Button
        sx={{
          color: "#1E2328",
          my: 0.5,
          textAlign: "left",
          ":hover": {
            bgcolor: "#FFCE26",
          },
        }}
        style={{ justifyContent: "flex-start" }}
        onClick={() => {
          navigate(`/internship/${company}`);
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>{company}</Typography>
          <Typography>{position}</Typography>
        </Box>
      </Button>
    );
  };

export default function IntershipPage() {
 // const { companyandposition } = useParams();
  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState([]);
  const theme = useTheme();
  const userInfo = localStorage.getItem("userInfo");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);
  const [internshipList, setInternshipList] = useState([]);
  const navigate = useNavigate();
  const userInfoJSON = JSON.parse(userInfo);
  const [follow, setFollow] = useState();
  const userId = userInfoJSON._id;

  /*const checkFollow = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
      params: {
        company: company,
        position: position
        userId: userInfoJSON._id,
      },
    };
    const { data } = await axios.get(`/api/internships/checkfollowinternship`, config);
    setFollow(data);
  };*/

 const getPosts = async () => {
    setLoading(true);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await Axios.get(
      `/api/post/getpostbycompanyandpposition/`,
      config
    );
    setPosts(data);
    setLoading(false);
  };

  /*const getInternshipInfo = async () => {
    setLoading(true);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.get(
      `/api/internship/searchInternships/${company, position}`,
      { company, position },
      config
    );
    setTitle(data.title);
    setLoading(false);
  };*/

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (!userInfo) {
      navigate("/");
    }
  });

  /*useEffect(() => {
    getInternshipInfo();
    checkFollow();
    getPosts();
  }, [company, post]);*/

  const [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const count = Math.ceil(posts.length / PER_PAGE);
  const _DATA = PaginationButtons(posts, PER_PAGE);

  console.log("posts internship", posts);


  /*const handleChangeFollow = async (e) => {
    if (!follow) {
      await axios({
        method: "put",
        url: "/api/profile/followinternship",
        data: {
          company: company,
          position: position,
          userId: userInfoJSON._id,
        },
      });
      setFollow(true);
    } else {
      await axios({
        method: "put",
        url: "/api/profile/unfollowinternship",
        data: {
        company: company,
        position: position,
        userId: userInfoJSON._id,
        },
      });
      setFollow(false);
    }
  }; */

  useEffect(() => {
    const fetchInternship = async () => {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.get(
        `/api/internship/myinternships/${userId}`,
        { userId },
        config
      );
      setInternshipList(data);
      setLoading(false);
    };
    fetchInternship();
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
        `/api/internships/myinternships/search/${userId}/${searchQuery}`,
        { userId, searchQuery },
        config
      );

      setLoading(false);
    } catch (error) {
      throw error.message;
    }
  };

  let users = [{ name: "User 1" }, { name: "User 2" }, { name: "User 3" }];

  const handleCreatePost = async (
    event,
    _id,
    isAnonymous,
    text,
    title,
    company,
    position
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
        { _id, isAnonymous, text, title},
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

      console.log(postId, commentId);
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

  const handlePaginationChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };


    const customTheme = createTheme({
        palette: {
          primary: {
            main: "#000000",
            contrastText: "#ffce26"
          }
        }
      });

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
    setOpen(true);
    };

    const handleDrawerClose = () => {
    setOpen(false);
    };

  const [spacing, setSpacing] = React.useState(2);

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };
    return(
        <Box sx={{ display: "flex" }}>
        <TopDrawer open={open} handleDrawerOpen={handleDrawerOpen} isHomePage={false}/>
        <SideDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        theme={theme}
      />
        <Box component="main" sx={{flexGrow: 1, pt: 0 }}>
        <Grid
        container
        component="main"
        sx={{ height: "100vh", backgroundColor: "#FFCE26", display:"flex", alignContent: "flex-start",}}
        >
        <DrawerHeader />
            <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                padding: 2,
                gap: 3,
                overflow: "auto",
                flexFlow: "wrap"}}>

                <Box maxHeight={40} minWidth={700}>
                    <Typography variant="h5">
                        Shopee Software Engineer
                    </Typography>
                </Box>

                <Box maxHeight={40} minWidth={200}>
                <Stack spacing={2} direction="row">
                    <Button variant="contained" sx={{
                      mx: 2,
                      color: "#4BB543",
                      outlineColor: "#4BB543",
                      backgroundColor: "white",
                    }}>
                        Experienced
                    </Button>

                    <FormControlLabel
                    control={
                      <Checkbox
                        checked={follow ? follow : false}
                        //onChange={handleChangeFollow}
                      />
                    }
                    label={follow ? "Added to My Modules" : "Add to My Modules"}
                    sx={{ color: "#FFCE26" }}
                    />

                    <FormControl sx={{width:150}}>
                        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
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
                                <MenuItem>Latest</MenuItem>
                                <MenuItem>Oldest</MenuItem>
                                <MenuItem>Most likes</MenuItem>
                            </Select>
                    </FormControl>
                    </Stack>
                </Box>

                <Box minWidth={200}> 
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
                    <Search
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                    <TextField
                    label="Search by company or position"
                    id="searchQuery"
                    size="small"
                    sx={"width: 300"}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Box sx={{ py: 0.75}} />
                    <ThemeProvider theme={customTheme}>
                        <Stack>
                            <Button type = "submit" variant="contained" size="medium" flexDirection="row" >
                                Search
                            </Button>
                        </Stack>
                    </ThemeProvider>
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
                  {internshipList.slice(0, 10).map((internship) => (
                    <InternshipButton
                      company={internship.company}
                      position={internship.position}
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
                    onClick={() => {
                      navigate("/myinternship");
                    }}
                  >
                    <Typography fontFamily={"Berlin Sans FB"}>
                      View All My Internship
                    </Typography>
                  </Button>
                </Box>
              </Box>
                    

                <Box minWidth={650}>
                    <Card sx={{width: 500, height: 260, p: 1}} >

                    <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      m: 2,
                      width: "100%",
                    }}
                  >
                    
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
                  }}
                >
                  
                  {_DATA.currentData().map((posts) => (
                    <PostCard
                      posts={posts}
                      userInfo={userInfo}
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
                <PaginationButtons
                  count={count}
                  page={page}
                  onChange={handlePaginationChange}
                  showFirstButton
                  showLastButton
                  sx={{ mt: 2 }}
                />
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "25%" }}
              >
                <Typography sx={{ fontSize: 30, mb: 3 }}>
                  Experienced Users
                </Typography>
                <UserCard users={users} content="AY2021/2022 Semester 2" />
              </Box>

            </Box>
        </Grid>
    </Box>
</Box>
    )
                  }
