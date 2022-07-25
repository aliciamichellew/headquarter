import { Box, Button, Chip, createTheme, Grid, Icon, IconButton, Pagination, Stack, styled, TextField, ThemeProvider, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from 'react';
import SideDrawer from "../drawer/SideNav";
import TopDrawer from "../drawer/TopNav";
import InternshipCard from "./InternshipCard";
import usePagination from "../utils/Pagination";
import {Add, Search} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import NewInternship from "./NewInternship";
//import axios, { Axios } from "axios";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

export default function AllInternship() {
  let navigate = useNavigate();
  /*useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (!userInfo) {
      navigate("/");
    }
  });*/

  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#000000",
        contrastText: "#ffce26"
      }
    }
  });

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [InternshipList, setInternshipList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInternship = async () => {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);
      const res = await axios.get("/api/internships", config);
      setInternshipList(res.data);
      setLoading(false);
    };
    fetchInternship();
  }, []);

 const handleCreateNew = async (event, company, position) => {
    event.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { res } = await axios({
        method: "post",
        url: "/api/internships",
        data: {
          company: {company},
          position: {position},
        },
      });
    } catch (error) {}
  };

  const [searchQuery, setSearchQuery] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      setLoading(true);
      const { data } = await axios.get(
        `/api/internships/searchInternship?search=${searchQuery}`,
        { searchQuery },
        config
      );

      setInternshipList(data);
      setLoading(false);
    } catch (error) {
      throw error.message;
      setLoading(false);
    }
  };

  let [page, setPage] = useState(1);
  const PER_PAGE = 36;


  const [spacing, setSpacing] = React.useState(2);

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };
  
  const count = Math.ceil(InternshipList.length / PER_PAGE);
  const _DATA = usePagination(InternshipList, PER_PAGE);

  const handlePaginationChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  
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
          sx={{ minHeight: "100vh", backgroundColor: "#FFCE26", display:"flex", alignContent: "flex-start", }}>
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
            View All Internships
            </Typography>
              
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{display:"flex", justifyContent:"flex-end"}}>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />

                
              </Box>

              <ThemeProvider theme={customTheme}>
                <Stack spacing={2} direction="row">
                  <Button type="submit" fullWidth variant="contained" sx={{width: 150, height: 40,}}>
                    <Typography fontFamily={"Berlin Sans FB"}>Search</Typography>
                  </Button>
                  <NewInternship noValidate onSubmit={handleCreateNew}/>
                 
                </Stack>
              </ThemeProvider>

            </Box>
            {InternshipList.length == 0 && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography fontSize={40}>No Internships Found</Typography>
              </Box>
            )}
            <InternshipCard internships={_DATA.currentData()}/>

            <Grid justifyContent={'center'} alignItems={'center'} display={'flex'}>
            
              <Pagination
                count={10}
                page={page}
                onChange={handlePaginationChange}
                showFirstButton
                showLastButton/>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </Box>
  )    
}
