import React from "react";
import { Button, Typography, Box, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProfileButton = ({ firstName, lastName, username }) => {
  let navigate = useNavigate();
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
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ mr: 2 }}
        />
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
