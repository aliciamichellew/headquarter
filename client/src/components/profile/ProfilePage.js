import React, { useEffect } from "react";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ChatIcon from "@mui/icons-material/Chat";
import AddBoxIcon from "@mui/icons-material/AddBox";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";

import TopDrawer from "../../components/drawer/TopNav";
import SideDrawer from "../../components/drawer/SideNav";
import profile from "../../img/profile.png";

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

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let modules = [
    { moduleCode: "CS1010S", title: "Programming Methodology" },
    { moduleCode: "CS2030", title: "Programming Methodology II" },
    {
      moduleCode: "CP2106",
      title: "CP2106 Independent Software Development Project (Orbital)",
    },
    { moduleCode: "CS2040", title: "Data Structures and Algorithms" },
  ];

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
                    <AddBoxIcon sx={{ mr: 1 }} />
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
                    <ChatIcon sx={{ mr: 1 }} />
                    Chat
                  </Button>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", mt: 4 }}>
                  <LanguageIcon
                    sx={{ mr: 2, fontSize: 40, color: "#FFCE26" }}
                  />
                  <LinkedInIcon
                    sx={{ mr: 2, fontSize: 40, color: "#FFCE26" }}
                  />
                  <GitHubIcon sx={{ mr: 2, fontSize: 40, color: "#FFCE26" }} />
                  <FacebookIcon
                    sx={{ mr: 2, fontSize: 40, color: "#FFCE26" }}
                  />
                  <InstagramIcon
                    sx={{ mr: 2, fontSize: 40, color: "#FFCE26" }}
                  />
                  <TwitterIcon sx={{ mr: 0, fontSize: 40, color: "#FFCE26" }} />
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
