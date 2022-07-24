import React, { useState, useEffect } from "react";
import { Box, Card, Typography } from "@mui/material";
import profile from "../../img/profile.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileAvatar from "../profile/ProfileAvatar";

const UserCard = ({ users, content, loading }) => {
  if (loading) {
  }

  const navigate = useNavigate();

  const userId = users._id;
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");

  const getUserProfile = async (e) => {
    try {
      console.log("get user profile called");
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

  useEffect(() => {
    getUserProfile();
  }, [profilePic]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 0,
        gap: 3,
      }}
    >
      {/* {users.map((users) => ( */}
      <Card
        sx={{ width: 275, backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box>
            {!profilePic && (
              <img
                src={profile}
                alt="profile"
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
          <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
            <Typography
              onClick={() => {
                navigate(`/profile/${users.username}`);
              }}
            >
              {name}
            </Typography>
            {/* <Link href="#" underline="none" color="inherit">
                {users.name}
              </Link> */}
            <Typography>{content}</Typography>
          </Box>
        </Box>
      </Card>
      {/* ))} */}
    </Box>
  );
};

export default UserCard;
