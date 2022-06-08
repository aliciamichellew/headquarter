import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

import TopDrawer from "../../components/drawer/TopNav";
import SideDrawer from "../../components/drawer/SideNav";
import ModuleCard from "./ModuleCard";
import usePagination from "../utils/Pagination";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function AllModules() {
  let navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (!userInfo) {
      navigate("/");
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

  const [spacing, setSpacing] = React.useState(2);

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const jsx = `
  <Grid container spacing={${spacing}}>
  `;

  let modules = [
    { moduleCode: "AC5001", moduleTitle: "Architectural History of Singapore" },
    {
      moduleCode: "AC5002",
      moduleTitle: "Conservation Approaches and Philosophies",
    },
    {
      moduleCode: "AC5003",
      moduleTitle: "Urban Conservation and Regeneration",
    },
    { moduleCode: "AC5004", moduleTitle: "Architectural Heritage Management" },
    {
      moduleCode: "AC5005",
      moduleTitle:
        "Conservation Policy Methodology for Sustainable Development",
    },
    {
      moduleCode: "AC5006",
      moduleTitle: "Disaster Risk Management of Cultural Heritage",
    },
    { moduleCode: "AC5007", moduleTitle: "Dissertation" },
    { moduleCode: "AC5008", moduleTitle: "Design for Conservation" },
    { moduleCode: "AC5009", moduleTitle: "Design for Adaptive Reuse" },
    {
      moduleCode: "AC5010",
      moduleTitle: "Historic Buildings Survey and Recording",
    },
    { moduleCode: "AC5011", moduleTitle: "Conservation of C20th Buildings" },
    {
      moduleCode: "AC5012",
      moduleTitle: "Practical Building Conservation Skills I",
    },
    { moduleCode: "AC5014", moduleTitle: "Internship" },
    { moduleCode: "ACC1701", moduleTitle: "Accounting for Decision Makers" },
    { moduleCode: "ACC1701X", moduleTitle: "Accounting for Decision Makers" },
    { moduleCode: "ACC2706", moduleTitle: "Managerial Accounting" },
    {
      moduleCode: "ACC2707",
      moduleTitle: "Corporate Accounting & Reporting I",
    },
    {
      moduleCode: "ACC2708",
      moduleTitle: "Corporate Accounting & Reporting II",
    },
    { moduleCode: "ACC2709", moduleTitle: "Accounting Information Systems" },
    { moduleCode: "ACC3701", moduleTitle: "Assurance and Attestation" },
    { moduleCode: "ACC3702", moduleTitle: "Corporate and Securities Law" },
  ];

  let [page, setPage] = useState(1);
  const PER_PAGE = 20;

  const count = Math.ceil(modules.length / PER_PAGE);
  const _DATA = usePagination(modules, PER_PAGE);

  const handlePaginationChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <TopDrawer open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        theme={theme}
      />
      <Box component="main" sx={{ flexGrow: 1, pt: 3 }}>
        <Grid
          container
          component="main"
          sx={{
            height: "100",
            backgroundColor: "#FFCE26",
            display: "flex",
          }}
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
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography
                fontFamily={"Berlin Sans FB"}
                fontSize={50}
                sx={{ mx: 0, mt: 0 }}
                align={"left"}
              >
                View All Modules
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyItems: "center",
                    width: 250,
                  }}
                >
                  <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <TextField
                    id="searchByModuleCode"
                    label="Search by Module Code"
                    variant="standard"
                    sx={{ width: 200 }}
                  />
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    mb: 0,
                    color: "#FFCE26",
                    backgroundColor: "#1E2328",
                    width: 150,
                    height: 40,
                  }}
                >
                  <Typography fontFamily={"Berlin Sans FB"}>Search</Typography>
                </Button>
              </Box>
            </Box>

            <ModuleCard modules={_DATA.currentData()} />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
