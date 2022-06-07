import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import logo from "../../img/logo.png";
import TopDrawer from "../../components/drawer/TopNav";
import { styled } from "@mui/material/styles";
// import { Link, Redirect } from "react-router-dom";

import {
  BrowserRouter as BrowserRouter,
  Link as RouterLink,
  Router,
} from "react-router-dom";

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

export default function SignUpSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  turpis massa, rhoncus ac risus eget, vehicula finibus orci.
                  Proin feugiat, nunc vel molestie aliquam, libero dui fermentum
                  metus, vel congue nisi sapien rutrum augue.
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
                      />
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Box
                      component="form"
                      noValidate
                      onSubmit={handleSubmit}
                      sx={{ mt: 1 }}
                    >
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                      />
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
                        component={RouterLink}
                        to="/home"
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
