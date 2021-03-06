import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ModuleButton = ({ moduleCode, moduleTitle }) => {
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
        navigate(`/modules/${moduleCode}`);
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography>{moduleCode}</Typography>
        <Typography>{moduleTitle}</Typography>
      </Box>
    </Button>
  );
};

export default ModuleButton;
