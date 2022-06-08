import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import WorkIcon from "@mui/icons-material/Work";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  background: "#1E2328",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideDrawer({ open, handleDrawerClose, theme }) {
  const navigate = useNavigate();
  return (
    <Drawer
      variant="permanent"
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "#1E2328",
          color: "#FFCE26",
        },
      }}
    >
      <DrawerHeader>
        <IconButton
          onClick={() => {
            handleDrawerClose();
          }}
          sx={{ color: "#FFCE26" }}
        >
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem
          key={"Home"}
          disablePadding
          sx={{ display: "block" }}
          fontFamily={"Berlin Sans FB"}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              color: "#FFCE26",
            }}
            onClick={() => console.log("test")}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "#FFCE26",
              }}
            >
              <HomeIcon
                onClick={() => {
                  navigate("/");
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={"Home"}
              sx={{ opacity: open ? 1 : 0, color: "#FFCE26" }}
              primaryTypographyProps={{ fontFamily: "Berlin Sans FB" }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem
          key={"Modules"}
          disablePadding
          sx={{ display: "block", color: "#FFCE26" }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              color: "#FFCE26",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "#FFCE26",
              }}
            >
              <ViewModuleIcon
                onClick={() => {
                  navigate("/allmodules");
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={"Modules"}
              sx={{ opacity: open ? 1 : 0, color: "#FFCE26" }}
              primaryTypographyProps={{ fontFamily: "Berlin Sans FB" }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem
          key={"Internships"}
          disablePadding
          sx={{ display: "block", color: "#FFCE26" }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              color: "#FFCE26",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "#FFCE26",
              }}
            >
              <WorkIcon />
            </ListItemIcon>
            <ListItemText
              primary={"Internships"}
              sx={{ opacity: open ? 1 : 0, color: "#FFCE26" }}
              primaryTypographyProps={{ fontFamily: "Berlin Sans FB" }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem
          key={"Profile"}
          disablePadding
          sx={{ display: "block", color: "#FFCE26" }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              color: "#FFCE26",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "#FFCE26",
              }}
            >
              <AccountBoxIcon
                onClick={() => {
                  navigate("/profile");
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={"Profile"}
              sx={{ opacity: open ? 1 : 0, color: "#FFCE26" }}
              primaryTypographyProps={{ fontFamily: "Berlin Sans FB" }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem
          key={"Logout"}
          disablePadding
          sx={{ display: "block", color: "#FFCE26" }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              color: "#FFCE26",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "#FFCE26",
              }}
            >
              <LogoutIcon
                onClick={() => {
                  localStorage.removeItem("userInfo");
                  navigate("/");
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={"Logout"}
              sx={{ opacity: open ? 1 : 0, color: "#FFCE26" }}
              primaryTypographyProps={{ fontFamily: "Berlin Sans FB" }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
}
