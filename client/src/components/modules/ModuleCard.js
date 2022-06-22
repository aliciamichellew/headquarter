import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

const ModuleCard = ({ modules, loading }) => {
  let navigate = useNavigate();

  if (loading) {
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 0,
        gap: 3,
        overflow: "auto",
        flexFlow: "wrap",
      }}
    >
      {modules.map((modules) => (
        <Card sx={{ width: 275, height: 212.7 }}>
          <CardContent sx={{ height: 133.95 }}>
            <Typography variant="h5" component="div" sx={{ mb: 1 }}>
              {modules.moduleCode}
            </Typography>
            <Typography variant="h5" component="div">
              {modules.title}
            </Typography>
          </CardContent>
          <CardActions sx={{ flexDirection: "column" }}>
            <Button
              size="small"
              onClick={() => {
                navigate(`/modules/${modules.moduleCode}`);
              }}
            >
              Learn More
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default ModuleCard;
