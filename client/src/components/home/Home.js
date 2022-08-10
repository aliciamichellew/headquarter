import React, { useState, useEffect, useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import TopDrawer from "../../components/drawer/TopNav";
import SideDrawer from "../../components/drawer/SideNav";
import ModuleButton from "../modules/ModuleButton";
import axios from "axios";
import ProfileButton from "../profile/ProfileButton";
import InternshipButton from "../internship/internshipButton";
import { UserContext } from "../../App";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Home() {
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [internships, setInternships] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    const getMyModules = async (userId) => {
      try {
        setLoading(false);
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
        // console.log("data = ", data);
        setModules(data);
        // console.log("module getMyModules = ", modules);
        setLoading(false);
      } catch (error) {}
    };
    const getMyInternships = async (userId) => {
      try {
        setLoading(false);
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.get(
          `/api/internships/myinternship/${userId}`,
          { userId },
          config
        );

        setInternships(data);
        setLoading(false);
        // console.log("internships = ", internships);
      } catch (error) {}
    };
    const getMyFriends = async (userId) => {
      try {
        setLoading(true);
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.get(
          `/api/profile/getfollowing/${userId}`,
          { userId },
          config
        );

        setFriends(data);
        setLoading(false);
      } catch (error) {}
    };

    if (userInfo) {
      getMyModules(userInfo._id);
      getMyFriends(userInfo._id);
      getMyInternships(userInfo._id);
      // console.log("modules = ", modules);
    } else {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (!userInfo || !userInfo.verified) {
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
            <Box
              sx={{ justifyContent: "flex-start", alignItems: "flex-start" }}
            >
              <Typography
                fontFamily={"Berlin Sans FB"}
                fontSize={30}
                sx={{ mx: 0 }}
                align={"left"}
              >
                Welcome Back,
              </Typography>
              <Typography
                fontFamily={"Berlin Sans FB"}
                fontSize={50}
                sx={{ mx: 0, mt: 0 }}
                align={"left"}
              >
                {userInfo.firstName.toUpperCase()}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "33%" }}
              >
                <Typography
                  fontFamily={"Berlin Sans FB"}
                  fontSize={30}
                  sx={{ my: 3, display: "flex", justifyContent: "center" }}
                >
                  My Modules
                </Typography>
                <Card sx={{ mx: 5 }}>
                  <CardContent>
                    <Box component="form" noValidate sx={{ mt: 0 }}>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        {modules.map((modules) => (
                          <ModuleButton
                            moduleCode={modules.moduleCode}
                            moduleTitle={modules.title}
                          />
                        ))}
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{
                            mt: 2,
                            mb: 0,
                            color: "#000000",
                            backgroundColor: "#FFCE26",
                          }}
                          onClick={() => {
                            navigate("/mymodules");
                          }}
                        >
                          <Typography fontFamily={"Berlin Sans FB"}>
                            View All My Modules
                          </Typography>
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "33%",
                }}
              >
                <Typography
                  fontFamily={"Berlin Sans FB"}
                  fontSize={30}
                  sx={{ my: 3, display: "flex", justifyContent: "center" }}
                >
                  My Internships
                </Typography>
                <Card sx={{ mx: 5 }}>
                  <CardContent>
                    <Box component="form" noValidate sx={{ mt: 0 }}>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        {internships.map((internships) => (
                          <InternshipButton
                            company={internships.companyName}
                            position={internships.jobTitle}
                            internshipId={internships._id}
                          />
                        ))}
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          size="large"
                          sx={{
                            mt: 2,
                            mb: 0,
                            color: "#000000",
                            backgroundColor: "#FFCE26",
                          }}
                          onClick={() => {
                            navigate("/myinternship");
                          }}
                        >
                          <Typography fontFamily={"Berlin Sans FB"}>
                            View All My Internships
                          </Typography>
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "33%" }}
              >
                <Typography
                  fontFamily={"Berlin Sans FB"}
                  fontSize={30}
                  sx={{ my: 3, display: "flex", justifyContent: "center" }}
                >
                  My Friends
                </Typography>
                <Card sx={{ mx: 5 }}>
                  <CardContent>
                    <Box component="form" noValidate sx={{ mt: 0 }}>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        {friends.map((friends) => (
                          <ProfileButton
                            firstName={friends.firstName}
                            lastName={friends.lastName}
                            username={friends.username}
                          />
                        ))}
                        {/* <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{
                            mt: 2,
                            mb: 0,
                            color: "#000000",
                            backgroundColor: "#FFCE26",
                          }}
                        >
                          <Typography fontFamily={"Berlin Sans FB"}>
                            View All My Friends
                          </Typography>
                        </Button> */}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
