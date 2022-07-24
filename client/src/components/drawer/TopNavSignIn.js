import React, { useState, useEffect } from "react";

import axios from "axios";

import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";

import {
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Tooltip,
} from "@mui/material";
import { Home, Logout, ViewModule } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import logo from "../../img/logo.png";
import ProfileAvatar from "../profile/ProfileAvatar";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: "#1E2328",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function TopDrawer({ open, handleDrawerOpen }) {
  let navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openProfile = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          // width: "95%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <img src={logo} alt="logo" style={{ width: 40, marginRight: 40 }} />
            <Typography
              fontFamily={"Berlin Sans FB"}
              fontSize={20}
              sx={{
                display: "flex",
                justifyItems: "center",
                color: "#FFCE26",
                alignItems: "center",
              }}
            >
              headquarter
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
