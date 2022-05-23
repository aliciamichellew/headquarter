import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import logo from "../../img/logo.png";

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
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar
        PaperProps={{
          sx: {
            backgroundColor: "pink",
            color: "red",
          },
        }}
      >
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
          <HomeIcon />
        </IconButton>
        <img src={logo} alt="logo" style={{ width: 40, marginRight: 40 }} />
        <Typography
          fontFamily={"Berlin Sans FB"}
          fontSize={20}
          style={{ color: "#FFCE26" }}
        >
          headquarter
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
