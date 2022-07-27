import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Box,
  Grid,
  Button,
  Typography,
  Pagination,
  TextField,
  CircularProgress,
} from "@mui/material";

import { styled, useTheme } from "@mui/material/styles";

import { Search } from "@mui/icons-material";

import TopDrawer from "../../components/drawer/TopNav";
import SideDrawer from "../../components/drawer/SideNav";
import ModuleCard from "./ModuleCard";
import usePagination from "../utils/Pagination";

import axios from "axios";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function AllModules() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [moduleList, setModuleList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchModules = async () => {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);
      const res = await axios.get("/api/modules", config);
      setModuleList(res.data);
      setLoading(false);
    };
    if (!searchQuery) {
      fetchModules();
    }
  }, [searchQuery]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      setLoading(true);
      if (searchQuery) {
        const { data } = await axios.get(
          `/api/modules/allmodules/${searchQuery}`,
          { searchQuery },
          config
        );
        setModuleList(data);
      }

      setLoading(false);
    } catch (error) {
      throw error.message;
      setLoading(false);
    }
  };

  let [page, setPage] = useState(1);
  const PER_PAGE = 36;

  const count = Math.ceil(moduleList.length / PER_PAGE);
  const _DATA = usePagination(moduleList, PER_PAGE);

  const handlePaginationChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <TopDrawer
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        isHomePage={false}
      />
      <SideDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        theme={theme}
      />
      <Box component='main' sx={{ flexGrow: 1, pt: 3 }}>
        <Grid
          container
          component='main'
          sx={{
            minHeight: "100vh",
            backgroundColor: "#FFCE26",
            display: "flex",
            alignContent: "flex-start",
          }}>
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <Typography
                fontFamily={"Berlin Sans FB"}
                fontSize={50}
                sx={{ mx: 0, mt: 0 }}
                align={"left"}>
                View All Modules
              </Typography>
              {loading && <CircularProgress />}
              <Box
                component='form'
                noValidate
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyItems: "center",
                    width: 250,
                  }}>
                  <Search sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <TextField
                    id='searchQuery'
                    label='Search by Module Code'
                    variant='standard'
                    sx={{ width: 200 }}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </Box>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{
                    mt: 2,
                    mb: 0,
                    color: "#FFCE26",
                    backgroundColor: "#1E2328",
                    width: 150,
                    height: 40,
                  }}>
                  <Typography fontFamily={"Berlin Sans FB"}>Search</Typography>
                </Button>
              </Box>
            </Box>
            {moduleList.length == 0 && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography fontSize={40}>No Modules Found</Typography>
              </Box>
            )}
            <ModuleCard modules={_DATA.currentData()} />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Pagination
                count={count}
                page={page}
                onChange={handlePaginationChange}
                showFirstButton
                showLastButton
              />
            </Box>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
