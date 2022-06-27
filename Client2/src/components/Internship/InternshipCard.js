import { Box, Button, Card, CardContent, createTheme, Stack, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function InternshipCard() {
    const customTheme = createTheme({
        palette: {
          primary: {
            main: "#ffce26",
            contrastText: "#000000"
          }
        }
    });

    let navigate = useNavigate();

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
        
            <Card sx={{ width: 275, height: 212.7 }}>
                <CardContent sx={{ height: 133.95 }}>
                    <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                        Shopee
                    </Typography>

                    <Typography variant="h5" component="div">
                    Software Engineer Intern
                    </Typography>
                </CardContent>

                <ThemeProvider theme={customTheme}>
                <Box sx={{
            padding: 1, 
            width: 'auto'}}>
                    <Stack>

                            <Button variant="contained" size="small" onClick={() => {
                navigate(`/internships`)}}>
                            View
                        </Button>
                    </Stack>
                        
                </Box>
                </ThemeProvider>
                    
                
            </Card>
        </Box>
    )
}
