import { Box, Button, createTheme, Grid, Stack, styled, TextField, ThemeProvider, Typography, useTheme } from "@mui/material";
import React from 'react';
import SideDrawer from "../drawer/SideNav";
import TopDrawer from "../drawer/TopNav";
import InternshipCard from "./InternshipCard";
import usePagination from "../Pagination";
import {Search} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";


const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

export default function MyInternship() {

  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#000000",
        contrastText: "#ffce26"
      }
    }
  });
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const [spacing, setSpacing] = React.useState(2);

  /*const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };*/
  
  return (
    <Box sx={{ display: "flex" }}>
    <TopDrawer open={open} handleDrawerOpen={handleDrawerOpen} isHomePage={false}/>
    <SideDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        theme={theme}
      />
    <Box component="main" sx={{flexGrow: 1, pt: 3 }}>
    <Grid
      container
      component="main"
      sx={{ minHeight: "100vh", backgroundColor: "#FFCE26", display:"flex", alignContent: "flex-start", }}
    >
    <DrawerHeader />
      <Box
        sx={{
          mb: 4,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
          overflow: "auto",
          }}>
          
          <Typography 
            fontFamily={"Berlin Sans FB"}
            fontSize={50}
            sx={{ mx: 0, mt: 0 }}
            align={"left"}>
            View My Internships
          </Typography>
        

        <Box component="form" sx={{display:"flex", justifyContent:"flex-end"}}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            width: 250,
            }}
            >
          
          <Search sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
            label="Search by company or position"
            id="outlined-size-small"
            size="small"
            sx={{width: 200}}
            />
          </Box>

            <ThemeProvider theme={customTheme}>
            <Stack spacing={2} direction="row">
              <Button type="submit" fullWidth variant="contained" sx={{width: 150,
                    height: 40,}}>
              <Typography fontFamily={"Berlin Sans FB"}>Search</Typography>
              </Button>

              <Button variant="contained" sx={{width: 200,
                    height: 40,}} onClick={() => {
                   navigate("/allinternship");
          }}>
              <Typography fontFamily={"Berlin Sans FB"}>View All Internships</Typography>
              
              </Button>
              </Stack>
            </ThemeProvider>

        </Box>

          <InternshipCard />
          <Grid justifyContent={'center'} alignItems={'center'} display={'flex'}>
            <usePagination/>
          </Grid>
        </Box>
    </Grid>
    </Box>
    </Box>
    )    
}