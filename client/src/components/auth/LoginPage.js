import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

import logo from "../../img/logo.png";
import TopDrawer from "../../components/drawer/TopNavSignIn";
import ErrorMessage from "../ErrorMessage";
import setAuthToken from "../utils/setAuthToken";

import axios from "axios";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      fontFamily={"Berlin Sans FB"}
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        headquarter
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function LoginSide() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      setLoading(true);

      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );

      setUserInfo(data);
      // localStorage.setItem("userInfo", JSON.stringify(data));
      setAuthToken(data.token);
      setLoading(false);
      navigate("/home");
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <TopDrawer open={open} handleDrawerOpen={handleDrawerOpen} />
        <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              square
              sx={{
                backgroundColor: "#FFCE26",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={logo} alt="logo" style={{ width: 300 }} />
                <Typography fontFamily={"Berlin Sans FB"} fontSize={60}>
                  headquarter
                </Typography>
                <Typography
                  fontFamily={"Berlin Sans FB"}
                  fontSize={20}
                  sx={{ mx: 10 }}
                >
                  headquarter students to their dreams.
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              square
              sx={{
                backgroundColor: "#FFCE26",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  fontFamily={"Berlin Sans FB"}
                  fontSize={50}
                  sx={{ my: 5 }}
                >
                  Log In
                </Typography>
                <Card
                  sx={{
                    mx: 5,
                    display: "flex",
                    alignContent: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <CardContent>
                    {error && <ErrorMessage> {error} </ErrorMessage>}
                    {loading && <CircularProgress />}
                    <Box
                      component="form"
                      noValidate
                      onSubmit={handleSubmit}
                      sx={{ mt: 0 }}
                    >
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Box>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      alignContent: "center",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      component="form"
                      noValidate
                      onSubmit={handleSubmit}
                      sx={{
                        mt: 1,
                        display: "flex",
                        alignContent: "center",
                        flexDirection: "column",
                      }}
                    >
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
                          Log In
                        </Typography>
                      </Button>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                          mt: 3,
                          mb: 2,
                          color: "#000000",
                          backgroundColor: "#FFCE26",
                        }}
                      >
                        <Typography fontFamily={"Berlin Sans FB"}>
                          Continue with Google
                        </Typography>
                      </Button>
                      <Grid container>
                        <Grid item xs>
                          <Link href="#" variant="body2">
                            <Typography fontFamily={"Berlin Sans FB"}>
                              Forgot password?
                            </Typography>
                          </Link>
                        </Grid>
                        <Grid item>
                          <Link
                            component={RouterLink}
                            to="/signup"
                            variant="body2"
                          >
                            <Typography fontFamily={"Berlin Sans FB"}>
                              {"Don't have an account? Sign Up"}
                            </Typography>
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                  </CardActions>
                </Card>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
