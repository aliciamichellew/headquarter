import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  ThemeProvider,
  Stack,
  createTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ModuleCard = ({ modules, loading }) => {
   const customTheme = createTheme({
        palette: {
          primary: {
            main: "#ffce26",
            contrastText: "#000000"
          }
        }
    });
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
           <ThemeProvider theme={customTheme}>
                <Box sx={{
            width: 263}}>
                    <Stack>

                            <Button variant="contained" size="small" onClick={() => {
                navigate(`/modules/${modules.moduleCode}`)}}>
                            View
                        </Button>
                    </Stack>
                        
                </Box>
                </ThemeProvider>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default ModuleCard;
