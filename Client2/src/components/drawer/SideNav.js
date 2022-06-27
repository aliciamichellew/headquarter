import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ViewModule,
  ChevronLeft,
  ChevronRight,
  Home,
  Work,
  AccountBox,
  Logout,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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
          {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem
          key={"Home"}
          disablePadding
          sx={{ display: "block" }}
          fontFamily={"Berlin Sans FB"}
          onClick={() => {
            navigate("/home");
          }}
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
              <Home />
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
          onClick={() => {
            navigate("/allmodules");
          }}
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
              <ViewModule />
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
          onClick={() => {
            navigate("/allinternship");
          }}
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
              <Work />
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
          onClick={() => {
            navigate("/profilepage");
          }}
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
              <AccountBox />
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
          onClick={() => {
            localStorage.removeItem("userInfo");
            navigate("/");
          }}
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
              <Logout />
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