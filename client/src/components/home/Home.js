import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TopDrawer from "../../components/drawer/TopNav";
import SideDrawer from "../../components/drawer/SideNav";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Home() {
  let navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    // console.log(JSON.parse(userInfo).firstName);

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

  const [spacing, setSpacing] = React.useState(2);

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const jsx = `
<Grid container spacing={${spacing}}>
`;

  // console.log("print" localStorage.getItem("userInfo").firstName);
  const userInfo = localStorage.getItem("userInfo");

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
          sx={{ height: "100vh", backgroundColor: "#FFCE26" }}
        >
          <DrawerHeader />
          <Box
            sx={{
              mb: 4,
              mx: 4,
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
                {JSON.parse(userInfo).firstName}
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
                          <Typography fontFamily={"Berlin Sans FB"}>
                            CP2106 Independent Software Development Project
                            (Orbital)
                          </Typography>
                        </Button>
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
                          <Typography fontFamily={"Berlin Sans FB"}>
                            CS1010S Programming Methodology
                          </Typography>
                        </Button>
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
                          <Typography fontFamily={"Berlin Sans FB"}>
                            CS2030 Programming Methodology II
                          </Typography>
                        </Button>
                        <Button
                          size="large"
                          sx={{
                            color: "#000000",
                            ":hover": {
                              bgcolor: "#FFCE26",
                            },
                            textAlign: "left",
                          }}
                          style={{
                            justifyContent: "flex-start",
                          }}
                        >
                          <Typography fontFamily={"Berlin Sans FB"}>
                            CS2040 Data Structures and Algorithms
                          </Typography>
                        </Button>
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
                          <Typography fontFamily={"Berlin Sans FB"}>
                            Software Engineer
                          </Typography>
                        </Button>
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
                          <Typography fontFamily={"Berlin Sans FB"}>
                            Data Analyst
                          </Typography>
                        </Button>
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
                          <Typography fontFamily={"Berlin Sans FB"}>
                            Product Manager
                          </Typography>
                        </Button>
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
                        <Button
                          size="large"
                          sx={{
                            color: "#000000",
                            ":hover": {
                              bgcolor: "#FFCE26",
                            },
                          }}
                          style={{ justifyContent: "flex-start" }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Avatar
                              alt="Remy Sharp"
                              src="/static/images/avatar/1.jpg"
                              sx={{ mr: 2 }}
                            />
                            <Typography
                              sx={{
                                alignContent: "center",
                                justifyContent: "center",
                              }}
                              fontFamily={"Berlin Sans FB"}
                            >
                              User 1
                            </Typography>
                          </Box>
                        </Button>
                        <Button
                          size="large"
                          sx={{
                            color: "#000000",
                            ":hover": {
                              bgcolor: "#FFCE26",
                            },
                          }}
                          style={{ justifyContent: "flex-start" }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Avatar
                              alt="Bemy Sharp"
                              src="/static/images/avatar/1.jpg"
                              sx={{ mr: 2 }}
                            />
                            <Typography
                              sx={{
                                alignContent: "center",
                                justifyContent: "center",
                              }}
                              fontFamily={"Berlin Sans FB"}
                            >
                              User 2
                            </Typography>
                          </Box>
                        </Button>
                        <Button
                          size="large"
                          sx={{
                            color: "#000000",
                            ":hover": {
                              bgcolor: "#FFCE26",
                            },
                          }}
                          style={{ justifyContent: "flex-start" }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Avatar
                              alt="Aemy Sharp"
                              src="/static/images/avatar/1.jpg"
                              sx={{ mr: 2 }}
                            />
                            <Typography
                              sx={{
                                alignContent: "center",
                                justifyContent: "center",
                              }}
                              fontFamily={"Berlin Sans FB"}
                            >
                              User 3
                            </Typography>
                          </Box>
                        </Button>
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
                        >
                          <Typography fontFamily={"Berlin Sans FB"}>
                            View All My Friends
                          </Typography>
                        </Button>
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
