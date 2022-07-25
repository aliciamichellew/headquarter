import { ArrowLeft, Send } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardMedia, FormControl, IconButton, Input, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getSender } from "../config/chat";
import { useAppContext } from "../chat/ChatProvider";
import api from "../utils/axios";
import ScrollableChat from "./ScrollableChat";

import io from "socket.io-client";
import ChatLoading from "./ChatLoading";

let socket, selectedChatCompare;

export default function SingleChat({ fetchAgain, setFetchAgain }) { 
const { selectedChat, setSelectedChat, user, notification, setNotification } = useAppContext();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

 // eslint-disable-next-line react-hooks/exhaustive-deps
 const fetchMessages = async () => { 
    if (!selectedChat) return;

    try {
      setLoading(true);

      const { data } = await api.get(`/api/message/${selectedChat._id}`);

      setMessages(data);
      setLoading(false);
      socket.emit("join-chat", selectedChat._id);
    } catch (error) {
      toast.error(error);
    }
  };

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit("stop-typing", selectedChat._id);
      try {
        const { data } = await api.post(`/api/message`, {
          message: newMessage,
          chatId: selectedChat._id,
        });

        setNewMessage("");
        socket.emit("new-message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast.error(error);
      }
    }
  };

  useEffect(() => {
    socket = io(process.env.REACT_APP_SOCKET_ENDPOINT);
    socket.emit("setup", user);
    
    socket.on("connected", () => setSocketConnected(true));

    socket.on("typing", () => setIsTyping(true));
    socket.on("stop-typing", () => setIsTyping(false));
  }, [user]);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [fetchMessages, selectedChat]);

  useEffect(() => {
    socket.on("message-received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // notification
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop-typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
  <Box
  sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        padding:0,
        gap: 0,
        overflow: "auto",
        flexFlow: "wrap",
        ml: 0,
      }}>
      <Card sx={{ width: 350, height: 550, display: "flex" }}>
      {selectedChat ? (
        <Box>
        <CardContent sx={{ flex: " auto" }}>
          <Typography
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Poppins"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowLeft />}
              onClick={() => setSelectedChat("")}
            />
            {getSender(user, selectedChat.users)}
          </Typography>
        </CardContent>
        <CardActions>
          <Box
            component="form"
            sx={{ display: "flex", justifyContent: "flex-end", alignContent:'flex-end' }}
          >
            <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
            >
              {loading ? (
                <ChatLoading/>
              ) : (
                <div className="message">
                <ScrollableChat messages={messages} />
                </div>
              )}
              <FormControl onKeyDown={sendMessage} h="15%" isRequired mt={3}>
                {isTyping ? <Typography>Typing ...</Typography> : <></>}
                <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
                />
              </FormControl>
            </Box>
          </Box>
        </CardActions>
        </Box>
            ) : (
            <Box
            display="flex"
            alignItems="center"
            justifyContent={"center"}
            h="100%"
            >
              <Typography fontSize="3xl" pb={1} fontFamily="Poppins">
                Click On Users to Start Conversation
              </Typography>
            </Box>       
            )}
    </Card>
  </Box> 
  )}