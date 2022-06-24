import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
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
