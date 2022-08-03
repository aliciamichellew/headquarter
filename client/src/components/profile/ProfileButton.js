import React, { useState, useEffect } from "react";
import { Button, Typography, Box, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import profile from "../../img/profile.png";
import ProfileAvatar from "./ProfileAvatar";

const ProfileButton = ({ firstName, lastName, username }) => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const getUserId = async (e) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.get(
        `/api/profile/getuserid/${username}`,
        { username },
        config
      );
      setUserId(data);
      setLoading(false);
    } catch (error) {
      // console.log("error = ", error);
    }
  };

  const getProfile = async (e) => {
    try {
      setLoading(true);
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
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      getProfile();
    }
  }, [userId]);

  return (
    <Button
      sx={{
        color: "#1E2328",
        my: 0.5,
        textAlign: "left",
        ":hover": {
          bgcolor: "#FFCE26",
        },
      }}
      style={{ justifyContent: "flex-start" }}
      onClick={() => {
        navigate(`/profile/${username}`);
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ mr: 2 }}
        /> */}
        {!profilePic && (
          <img
            src={profile}
            alt="profile"
            style={{
              width: 50,
              marginRight: 5,
              borderRadius: "50%",
            }}
          />
        )}
        {profilePic && <ProfileAvatar profilePic={profilePic} width={50} />}
        <Typography
          sx={{
            alignContent: "center",
            justifyContent: "center",
          }}
          fontFamily={"Berlin Sans FB"}
        >
          {firstName + " " + lastName}
        </Typography>
      </Box>
    </Button>
  );
};

export default ProfileButton;
