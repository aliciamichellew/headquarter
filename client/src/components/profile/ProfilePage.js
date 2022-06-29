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
} from "@mui/icons-material";

import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";

import TopDrawer from "../../components/drawer/TopNav";
import SideDrawer from "../../components/drawer/SideNav";
import profile from "../../img/profile.png";
import ModuleButton from "../modules/ModuleButton";
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
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);
  const userInfo = localStorage.getItem("userInfo");
  const userInfoJSON = JSON.parse(userInfo);
  const userId = userInfoJSON._id;
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
  useEffect(() => {
    getMyModules();
  }, []);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // const userInfo = localStorage.getItem("userInfo");

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // let modules = [
  //   { moduleCode: "CS1010S", title: "Programming Methodology" },
  //   { moduleCode: "CS2030", title: "Programming Methodology II" },
  //   {
  //     moduleCode: "CP2106",
  //     title: "CP2106 Independent Software Development Project (Orbital)",
  //   },
  //   { moduleCode: "CS2040", title: "Data Structures and Algorithms" },
  // ];

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
                  <img
                    src={profile}
                    alt="profile"
                    style={{ width: 150, marginRight: 5, borderRadius: "50%" }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      ml: 5,
                    }}
                  >
                    <Typography sx={{ fontSize: 40, color: "#FFCE26" }}>
                      {JSON.parse(userInfo).firstName.toUpperCase()}{" "}
                      {JSON.parse(userInfo).lastName.toUpperCase()}
                    </Typography>
                    <Typography sx={{ fontSize: 20, color: "#FFCE26" }}>
                      Hi! Nice to meet you! Feel free to follow and chat me!
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                    <AddBox sx={{ mr: 1 }} />
                    Follow
                  </Button>
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
                  <Language sx={{ mr: 2, fontSize: 40, color: "#FFCE26" }} />
                  <LinkedIn sx={{ mr: 2, fontSize: 40, color: "#FFCE26" }} />
                  <GitHub sx={{ mr: 2, fontSize: 40, color: "#FFCE26" }} />
                  <Facebook sx={{ mr: 2, fontSize: 40, color: "#FFCE26" }} />
                  <Instagram sx={{ mr: 2, fontSize: 40, color: "#FFCE26" }} />
                  <Twitter sx={{ mr: 0, fontSize: 40, color: "#FFCE26" }} />
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
