import { Avatar, Box, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ChatLoading from '../chat/ChatLoading';
import { useAppContext } from '../chat/ChatProvider';
import profile from "../../img/profile.png";
import ProfileAvatar from '../profile/ProfileAvatar';

const UserListItem = ({handleFunction}) => {
  const {user} = useAppContext();
    const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");
   const [name, setName] = useState("");

  useEffect(() => {
    const getUserProfile = async userId => {
      try {
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
        const name = data.firstName + " " + data.lastName;
        setName(name);
      } catch (err) {}
    };
    if (user._id) {
      getUserProfile(user._id);
    }
  }, [user._id]);

    return (
        <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: " rgba(67, 43, 255, 0.8)",
        color: "white",
      }}
      w="80%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
     <Box sx={{ display: "flex", flexDirection: "row" }}>
     <Box ml={1} mr={2} mt={1}>
       {!profilePic && (
          <img
            src={profile}
            alt='profile'
            style={{ width: 50, borderRadius: "50%" }}
          />
            )}
       {profilePic && (
          <ProfileAvatar
            profilePic={profilePic}
            width={50}
                // sx={{ mr: 1 }}
          />
        )}
      </Box>
      <Box>
        <Typography fontSize={17}>{user.username}</Typography>
        <Typography fontSize={17}>
          {user.email}
        </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserListItem;