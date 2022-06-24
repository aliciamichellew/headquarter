import React from "react";
import { Box, Card, Typography } from "@mui/material";
import profile from "../../img/profile.png";

const UserCard = ({ users, content, loading }) => {
  if (loading) {
  }
  // console.log(users);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 0,
        gap: 3,
        // overflow: "auto",
        // flexFlow: "wrap",
      }}
    >
      {users.map((users) => (
        <Card
          sx={{ width: 275, backgroundColor: "transparent", boxShadow: "none" }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box>
              <img
                src={profile}
                alt="profile"
                style={{ width: 50, marginRight: 10, borderRadius: "50%" }}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>{users.name}</Typography>
              <Typography>{content}</Typography>
            </Box>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default UserCard;
