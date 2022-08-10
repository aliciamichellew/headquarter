import React, { useEffect, useState, useContext } from "react";
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
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import logo from "../../img/logo.png";
import TopDrawer from "../../components/drawer/TopNavSignIn";
import ErrorMessage from "../ErrorMessage";
import setAuthToken from "../utils/setAuthToken";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import axios from "axios";
import { addUserToLocalStorage } from "../utils/localStorage";
import { UserContext } from "../../App";

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

export default function SignUpSide() {
  const [isSignUpFail, setIsSignUpFail] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords Do not Match");
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        setLoading(true);
        const { data } = await axios.post(
          "/api/users",
          { firstName, lastName, username, email, password },
          config
        );
        setUserInfo(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        setAuthToken(data.token);
        // addUserToLocalStorage(data);
        // localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/verifymail");
        // console.log("masuk")
      } catch (error) {
        setIsSignUpFail(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
                  Sign Up
                </Typography>
                <Card sx={{ mx: 5 }}>
                  <CardContent>
                    {error && <ErrorMessage> {error} </ErrorMessage>}
                    {message && <ErrorMessage> {message} </ErrorMessage>}
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
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        autoComplete="firstName"
                        autoFocus
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lastName"
                        autoFocus
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
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
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="current-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Box>
                  </CardContent>
                  {isSignUpFail && (
                    <div style={{ padding: "0px 10px 0px 10px" }}>
                      <Alert severity="error">User already existed!</Alert>
                    </div>
                  )}
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
                      sx={{ mt: 1 }}
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
                          Sign Up
                        </Typography>
                      </Button>
                      {/* <Button
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
                      </Button> */}
                      <Grid container>
                        <Grid item>
                          <Link
                            component={RouterLink}
                            to="/login"
                            variant="body2"
                          >
                            <Typography fontFamily={"Berlin Sans FB"}>
                              {"Have an account? Log in"}
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
