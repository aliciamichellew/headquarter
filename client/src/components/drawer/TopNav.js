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

export default function TopDrawer({ open, handleDrawerOpen, isHomePage }) {
  let navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openProfile = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userInfo = localStorage.getItem("userInfo");
  const userInfoJSON = JSON.parse(userInfo);
  const userId = userInfoJSON._id;
  const [profilePic, setProfilePic] = useState("");

  const getUserProfile = async (e) => {
    try {
      console.log("get user profile called");
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.get(
        `/api/profile/getprofile/${userId}`,
        { userId },
        config
      );
      setProfilePic(data.profilePic || "");
    } catch (err) {}
  };

  useEffect(() => {
    getUserProfile();
  }, [profilePic]);

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
            {!isHomePage && (
              <IconButton
                style={{ color: "#FFCE26" }}
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <Home />
              </IconButton>
            )}
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {!isHomePage && (
              <React.Fragment>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={openProfile ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openProfile ? "true" : undefined}
                    >
                      {profilePic && (
                        <ProfileAvatar profilePic={profilePic} width={32} />
                      )}
                      {!profilePic && (
                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={openProfile}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/myprofile");
                    }}
                  >
                    {!profilePic && <Avatar />}
                    {profilePic && (
                      <ProfileAvatar
                        profilePic={profilePic}
                        width={32}
                        sx={{ mr: 1 }}
                      />
                    )}
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/mymodules");
                    }}
                  >
                    <ViewModule sx={{ mr: 1 }} /> My Modules
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      localStorage.removeItem("userInfo");
                      navigate("/");
                    }}
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
