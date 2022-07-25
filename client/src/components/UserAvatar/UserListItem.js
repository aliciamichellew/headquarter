import { Avatar, Box, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import ChatLoading from '../chat/ChatLoading';

const UserListItem = ({ user, handleFunction, loading}) => {
    const navigate = useNavigate();

    if(loading) {
        <ChatLoading/>
    }
    
    return (
        <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: " rgba(67, 43, 255, 0.8)",
        color: "white",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.username}
        src={user.avatar}
      />
      <Box>
        <Typography>{user.username}</Typography>
        <Typography fontSize="xs">
          Email : {user.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserListItem;