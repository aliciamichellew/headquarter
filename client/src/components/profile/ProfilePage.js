import React, { useState, useEffect } from "react";

import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  Tabs,
  Tab,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import {
  AddBox,
  Instagram,
  GitHub,
  Language,
  LinkedIn,
  Facebook,
  Twitter,
  Chat,
  Add,
  Check,
} from "@mui/icons-material";

import PropTypes from "prop-types";

import { useNavigate, useParams } from "react-router-dom";

import TopDrawer from "../../components/drawer/TopNav";
import SideDrawer from "../../components/drawer/SideNav";
import profile from "../../img/profile.png";
import ModuleButton from "../modules/ModuleButton";
import ProfileAvatar from "./ProfileAvatar";
import axios from "axios";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ mx: 3, mb: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    color: "#FFCE26",
  };
}

const styles = {
  tab: {
    color: "#FFCE26",
  },
};

export default function ProfilePage() {
  const { username } = useParams();

  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);
  const userInfo = localStorage.getItem("userInfo");
  const userInfoJSON = JSON.parse(userInfo);
  const [userId, setUserId] = useState("");
  const [userProfile, setUserProfile] = useState();
  const [profilePic, setProfilePic] = useState("");
  const [bio, setBio] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [instagram, setInstagram] = useState("");
  const [website, setWebsite] = useState("");
  const [github, setGithub] = useState("");
  const [follow, setFollow] = useState();

  const checkFollow = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
      params: {
        userId: userInfoJSON._id,
        userIdFollow: userId,
      },
    };
    const { data } = await axios.get(`/api/profile/checkfollowuser`, config);
    console.log(data);
    setFollow(data);
  };

  const getUserId = async (e) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.get(
        `/api/profile/getuserid/${username}`,
        { username },
        config
      );
      setUserId(data);
      setLoading(false);
    } catch (error) {}
  };

  const getProfile = async (e) => {
    try {
      setLoading(true);
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
      setUserProfile(data);
      setProfilePic(data.profilePic || "");
      setBio(data.bio || "");
      setTwitter(data.social.twitter || "");
      setFacebook(data.social.facebook || "");
      setLinkedIn(data.social.linkedin || "");
      setInstagram(data.social.instagram || "");
      setWebsite(data.social.website || "");
      setGithub(data.social.github || "");
      setLoading(false);
    } catch (error) {}
  };

  const getMyModules = async (e) => {
    try {
      setLoading(false);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.get(
        `/api/modules/moduletaken/${userId}`,
        { userId },
        config
      );
      setModules(data);
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (!userInfo) {
      navigate("/");
    }
  });

  const handleChangeFollow = async (e) => {
    if (!follow) {
      await axios({
        method: "put",
        url: "/api/profile/followuser",
        data: {
          userId: userInfoJSON._id,
          userIdFollow: userId,
        },
      });
      setFollow(true);
    } else {
      await axios({
        method: "put",
        url: "/api/profile/unfollowuser",
        data: {
          userId: userInfoJSON._id,
          userIdFollow: userId,
        },
      });
      setFollow(false);
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      getProfile();
      getMyModules();
      checkFollow();
    }
  }, [userId]);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
              mt: 5,
              mb: 4,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Card
              sx={{
                display: "flex",
                justifyItems: "center",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#1E2328",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  mt: 5,
                  mb: 4,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  {!profilePic && (
                    <img
                      src={profile}
                      alt="profile"
                      style={{
                        width: 150,
                        marginRight: 5,
                        borderRadius: "50%",
                      }}
                    />
                  )}
                  {profilePic && (
                    <ProfileAvatar profilePic={profilePic} width={150} />
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      ml: 5,
                    }}
                  >
                    <Typography sx={{ fontSize: 40, color: "#FFCE26" }}>
                      {userProfile && userProfile.firstName.toUpperCase()}{" "}
                      {userProfile && userProfile.lastName.toUpperCase()}
                    </Typography>
                    <Typography sx={{ fontSize: 20, color: "#FFCE26" }}>
                      {userProfile && userProfile.bio}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  {/* <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 2,
                      mb: 0,
                      mx: 2,
                      color: "#1E2328",
                      backgroundColor: "#FFCE26",
                      width: 150,
                      height: 40,
                    }}
                  >
                    <AddBox sx={{ mr: 1 }} />
                    Follow
                  </Button> */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<Add sx={{ color: "#FFCE26" }} />}
                        checkedIcon={<Check sx={{ color: "#FFCE26" }} />}
                        checked={follow ? follow : false}
                        onChange={handleChangeFollow}
                      />
                    }
                    label={follow ? "Followed" : "Follow"}
                    sx={{ color: "#FFCE26" }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 2,
                      mb: 0,
                      mx: 2,
                      color: "#1E2328",
                      backgroundColor: "#FFCE26",
                      width: 150,
                      height: 40,
                    }}
                  >
                    <Chat sx={{ mr: 1 }} />
                    Chat
                  </Button>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", mt: 4 }}>
                  {website && (
                    <IconButton>
                      <Language
                        sx={{ mr: 2, fontSize: 40, color: "#FFCE26" }}
                        onClick={() => window.open(`https://${website}`)}
                      />
                    </IconButton>
                  )}
                  {linkedIn && (
                    <IconButton>
                      <LinkedIn
                        sx={{ mr: 2, fontSize: 40, color: "#FFCE26" }}
                        onClick={() => window.open(`https://${linkedIn}`)}
                      />
                    </IconButton>
                  )}
                  {github && (
                    <IconButton>
                      <GitHub
                        sx={{ mr: 2, fontSize: 40, color: "#FFCE26" }}
                        onClick={() =>
                          window.open(`https://www.github.com/${github}`)
                        }
                      />
                    </IconButton>
                  )}
                  {facebook && (
                    <IconButton>
                      <Facebook
                        sx={{ mr: 2, fontSize: 40, color: "#FFCE26" }}
                        onClick={() =>
                          window.open(`https://www.facebook.com/${facebook}/`)
                        }
                      />
                    </IconButton>
                  )}
                  {instagram && (
                    <IconButton>
                      <Instagram
                        sx={{ mr: 2, fontSize: 40, color: "#FFCE26" }}
                        onClick={() =>
                          window.open(`https://www.instagram.com/${instagram}/`)
                        }
                      />
                    </IconButton>
                  )}
                  {twitter && (
                    <IconButton>
                      <Twitter
                        sx={{ mr: 0, fontSize: 40, color: "#FFCE26" }}
                        onClick={() =>
                          window.open(`https://www.twitter.com/${twitter}/`)
                        }
                      />
                    </IconButton>
                  )}
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", mt: 3 }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    orientation="vertical"
                    TabIndicatorProps={{ style: { background: "#FFCE26" } }}
                  >
                    <Tab label="Modules" {...a11yProps(0)} style={styles.tab} />
                    <Tab
                      label="Internships"
                      {...a11yProps(1)}
                      style={styles.tab}
                    />
                  </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                  <Box sx={{ mt: 0 }}>
                    <Typography
                      sx={{
                        fontSize: 25,
                        justifyContent: "center",
                        color: "#FFCE26",
                      }}
                    >
                      Modules Taken
                    </Typography>
                    <Card sx={{ mx: 0, mt: 3 }}>
                      <CardContent>
                        <Box component="form" noValidate sx={{ mt: 0 }}>
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            {modules.length == 0 && (
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <Typography fontSize={20}>
                                  User has not taken any modules.
                                </Typography>
                              </Box>
                            )}
                            {modules.map((modules) => (
                              <ModuleButton
                                moduleCode={modules.moduleCode}
                                moduleTitle={modules.title}
                              />
                            ))}
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Box sx={{ mt: 0 }}>
                    <Typography sx={{ fontSize: 25, color: "#FFCE26" }}>
                      Internships Experiences
                    </Typography>
                    <Card sx={{ mx: 0, mt: 3 }}>
                      <CardContent>
                        <Box component="form" noValidate sx={{ mt: 0 }}>
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            {modules.length == 0 && (
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <Typography fontSize={20}>
                                  No Modules Found
                                </Typography>
                              </Box>
                            )}
                            {modules.map((modules) => (
                              <Button
                                size="large"
                                sx={{
                                  color: "#000000",
                                  ":hover": {
                                    bgcolor: "#FFCE26",
                                  },
                                  textAlign: "left",
                                }}
                                style={{ justifyContent: "flex-start" }}
                              >
                                <Typography>
                                  {modules.moduleCode} {modules.title}
                                </Typography>
                              </Button>
                            ))}
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </TabPanel>
              </Box>
            </Card>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
