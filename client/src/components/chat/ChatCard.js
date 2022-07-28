import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  createTheme,
  Stack,
  TextField,
  ThemeProvider,
  Typography
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [persons, setPersons] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);
  const {
    setSelectedChat,
    user,
    chats,
    setChats,
  } = useAppContext();


  const handleSearch = async e => {
  e.preventDefault();  
    if (!search) {
      toast.error("Please Provide username");
      return;
    }
    try {
      setLoading(true);

      //problem
      const { data } = await api.get(`/api/profile/fetchprofile/`, {search});

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

      const { data } = await api.post(`/api/chat/`, {userId});

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const fetchPersons = async () => {
       const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await api.get(`/api/profile/getfollowing/${user._id}`, config);

      setLoading(false);
      setPersons(data);
    };
    fetchPersons();
  }, []);

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
        ml: 0,
      }}
    >
      <Card sx={{ width: 300, height: 550 }}>
        <CardContent sx={{ height: 525 }}>
          <Box component="form" sx={{display:"flex", justifyContent:"flex-end"}}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            width: 270,
            padding: 0,
            ml: 5,

            }}
            >
            <TextField
            
            label="Search by name or email"
            id="outlined-size-small"
            size="small"
            sx={{width: 145, mr: 1}}
            value = {search}
            onChange={(e) => setSearch(e.target.value)}
            />
            <ThemeProvider theme={customTheme}>
            <Stack  direction="row">
              <Button type="submit" fullWidth variant="contained"  onClick = {handleSearch}>
              <Typography fontFamily={"Berlin Sans FB"}>Search</Typography>
              </Button>
              </Stack>
            </ThemeProvider>
            
          </Box>
       {persons.map((person, id) => {
        if (person._id !== user._id) 
        return <UserListItem
            key={id}
            user={person}
            handleFunction={()=>accessChat(person._id)}/>
      })}

        {loading ? (<ChatLoading /> 
        ):( 
          searchResult?.map((user) => (
            <UserListItem
            key={user._id}
            user={user}
            handleFunction={()=>accessChat(user._id)}
            />)))}
            </Box>
            
           
          {loadingChat && <CircularProgress />}
        </CardContent>
      </Card>
    </Box>
  )
}
