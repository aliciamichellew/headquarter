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
import { createTheme, ThemeProvider } from "@mui/material/styles";

import logo from "../../img/logo.png";
import TopDrawer from "../../components/drawer/TopNavSignIn";
import ErrorMessage from "../ErrorMessage";
import setAuthToken from "../utils/setAuthToken";
import { ArrowBack, Email } from "@mui/icons-material";

import axios from "axios";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const theme = createTheme();

export default function ForgotPassword() {
  const { userInfo } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify({ email });
      const res = await axios.post(
        `/api/users/sendforgotpassword`,
        body,
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <TopDrawer open={open} handleDrawerOpen={handleDrawerOpen} />
      <Box component="main" sx={{ flexGrow: 1, pt: 0 }}>
        <Grid
          container
          component="main"
          sx={{
            minHeight: "100vh",
            backgroundColor: "#FFCE26",
            display: "flex",
            alignContent: "center",
          }}
        >
          <Box
            sx={{
              mb: 4,
              mx: 4,
              mt: 3,
              display: "flex",
              flexDirection: "center",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ my: 1 }} align={"center"} fontSize={30}>
                Forgot your password?
              </Typography>
              <Typography sx={{ my: 1 }} align={"center"} fontSize={30}>
                No worries! Enter your email address and we will send you a link
                to reset your password.
              </Typography>
              <Typography sx={{ my: 1 }} align={"center"} fontSize={30}>
                Enter your email
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <TextField
                  id="outlined-password-input"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ my: 1 }}
                />
                <Button
                  type="submit"
                  size="large"
                  sx={{
                    color: "#1E2328",
                    my: 0.5,
                    mx: 1,
                    textAlign: "left",
                    ":hover": {
                      bgcolor: "#FFCE26",
                    },
                  }}
                  //   style={{ justifyContent: "flex-start" }}
                  startIcon={<Email />}
                  align={"center"}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography fontSize={20}>Send Reset Link</Typography>
                  </Box>
                </Button>
              </Box>

              <Button
                size="large"
                sx={{
                  color: "#1E2328",
                  my: 0.5,
                  mx: 1,
                  textAlign: "left",
                  ":hover": {
                    bgcolor: "#FFCE26",
                  },
                }}
                //   style={{ justifyContent: "flex-start" }}
                onClick={() => {
                  navigate("/login");
                }}
                startIcon={<ArrowBack />}
                align={"center"}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography fontSize={20}>Back To Login Page</Typography>
                </Box>
              </Button>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
