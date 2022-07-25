import {
  Box,
  Button,
  Card,
  CardContent,
  createTheme,
  Stack,
  TextField,
  ThemeProvider,
  Typography
} from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatLoading from "./ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import api from "../utils/axios";
import { useAppContext } from "../chat/ChatProvider";
import { toast } from "react-toastify";

export default function ChatCard() {
  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#000000",
        contrastText: "#ffce26"
      }
    }
  });

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const navigate = useNavigate();
  const {
    setSelectedChat,
    user,
    chats,
    setChats,
  } = useAppContext();


  const handleSearch = async () => {
    if (!search) {
      toast.error("Please Provide username");
      return;
    }
    try {
      setLoading(true);

      const { data } = await api.get(`/api/profile/fetchprofile/${search}`);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error(error);
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);
    try {
      setLoadingChat(true);

      const { data } = await api.get(`/api/chat/${userId}`);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 3,
        gap: 0,
        overflow: "auto",
        flexFlow: "wrap",
        ml: 3,
      }}
    >
      <Card sx={{ width: 260, height: 550 }}>
        <CardContent sx={{ height: 65 }}>
          <Box component="form" sx={{display:"flex", justifyContent:"flex-end"}}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            width: 250,
            }}
            >
            <TextField
            
            label="Search by name or email"
            id="outlined-size-small"
            size="small"
            sx={{width: 100, gap: 2}}
            value = {search}
            onChange={(e) => setSearch(e.target.value)}
            />

           
          </Box>

            <ThemeProvider theme={customTheme}>
            <Stack spacing={2} direction="row">
              <Button type="submit" fullWidth variant="contained"  onClick = {handleSearch}>
              <Typography fontFamily={"Berlin Sans FB"}>Search</Typography>
              </Button>
              </Stack>
            </ThemeProvider>
        {loading ? (<ChatLoading /> 
        ):( 
          searchResult?.map(user => (
            <UserListItem
            key={user._id}
            user={user}
            handleFunction={()=>accessChat(user._id)}
            />)))}
            </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
