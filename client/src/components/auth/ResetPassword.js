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
import { ArrowBack, Email, LockReset } from "@mui/icons-material";

import axios from "axios";

import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../App";

const theme = createTheme();

export default function ResetPassword() {
  const { userInfo } = useContext(UserContext);
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords Do not Match");
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const res = await axios.put(
          `/api/users/resetpassword/${token}`,
          { newPassword },
          config
        );
        console.log("change password successful");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
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
                Reset Password
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
                {message && <ErrorMessage> {message} </ErrorMessage>}
                <Typography sx={{ my: 1 }} align={"center"} fontSize={30}>
                  Enter new password
                </Typography>
                <TextField
                  id="outlined-password-input"
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  sx={{ my: 1 }}
                />
                <Typography sx={{ my: 1 }} align={"center"} fontSize={30}>
                  Confirm password
                </Typography>
                <TextField
                  id="outlined-password-input"
                  label="New Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                  startIcon={<LockReset />}
                  align={"center"}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography fontSize={20}>Reset Password</Typography>
                  </Box>
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
