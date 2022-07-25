import React, { useState, useEffect } from "react";
import { useAppContext } from "../chat/ChatProvider";
import api from "../utils/axios";
import ChatLoading from "./ChatLoading";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../utils/localStorage";
import { getSender } from "../config/chat";
import { Box, Card, Stack, Typography } from "@mui/material";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { user, selectedChat, setSelectedChat, chats, setChats } = useAppContext();

  const fetchChats = async () => {
    try {
      const { data } = await api.get(`/api/chat/${user._id}`);

      setChats(data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    setLoggedUser(getUserFromLocalStorage("user"));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
     <Card sx={{ width: 275, height: 550, display: "flex" }}>
      <Typography
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Poppins"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats?.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={
                  selectedChat === chat ? "rgba(67, 43, 255, 0.8)" : "#E8E8E8"
                }
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat?._id}
              >
                <Typography>
                  {getSender(loggedUser, chat?.users)}
                  
                  </Typography>
                  {chat.latestMessage && (
                  <Typography fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                </Typography>
             ) }
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
      </Card>
    </Box>
  );
};

export default MyChats;