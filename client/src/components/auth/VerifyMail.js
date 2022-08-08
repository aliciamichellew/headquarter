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
import { ArrowBack } from "@mui/icons-material";

import axios from "axios";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const theme = createTheme();

export default function VerifyMail() {
  const { userInfo } = useContext(UserContext);

  let navigate = useNavigate();

  return (
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
              Thank you!
            </Typography>
            <Typography sx={{ my: 1 }} align={"center"} fontSize={30}>
              An email has been sent to {userInfo.email}.
            </Typography>
            <Typography sx={{ my: 1 }} align={"center"} fontSize={30}>
              Please check your inbox to verify your email address.
            </Typography>
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
  );
}
