import styled from "@emotion/styled";
import { Box, createTheme, Grid, Menu, MenuItem, Pagination, Typography, useTheme } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SideDrawer from "../drawer/SideNav";
import TopDrawer from "../drawer/TopNav";
import ChatCard from "../chat/ChatCard";
import ChatBox from "./ChatBox";
import { useAppContext } from "../chat/ChatProvider";
import { getUserFromLocalStorage } from "../utils/localStorage";
import MyChats from "./MyChats";
import { toast } from "react-toastify";
import { getSender } from "../config/chat";
import { NotificationAdd } from "@mui/icons-material";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

export default function ChatPage() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  let [page, setPage] = useState(1);
  const PER_PAGE = 36;


  const handlePaginationChange = (e, p) => {
    setPage(p);
  };

  const [spacing, setSpacing] = React.useState(2);

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

   const { user } = useAppContext();

  const [fetchAgain, setFetchAgain] = useState(false);
  
  return (
    <Box sx={{ display: "flex" }}>
      <TopDrawer open={open} handleDrawerOpen={handleDrawerOpen} isHomePage={false}/>
      <SideDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        theme={theme}
      />
        <Box component="main" sx={{flexGrow: 1, pt: 3 }}>
      <Grid
        container
        component="main"
        sx={{ minHeight: "100vh", backgroundColor: "#FFCE26", display:"flex", alignContent: "flex-start", }}
      >
      <DrawerHeader />
        <Box
          sx={{
            mb: 4,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
            overflow: "auto",
            }}>
            
            <Typography
              fontFamily={"Berlin Sans FB"}
              fontSize={50}
              sx={{ mx: 0, mt: 0 }}
              align={"left"}>
              Chat
            </Typography>
          <Box sx={{display: "flex"}}>
          {user && <ChatCard />}
          {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />)}
          {user && <MyChats fetchAgain={fetchAgain} />}

          </Box>
            <Grid justifyContent={'center'} alignItems={'center'} display={'flex'}>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </Box>
  )    
}
