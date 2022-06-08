import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled, useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

import TopDrawer from "../../components/drawer/TopNav";
import SideDrawer from "../../components/drawer/SideNav";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Home() {
  //   let navigate = useNavigate();
  //   useEffect(() => {
  //     const userInfo = localStorage.getItem("userInfo");

  //     if (!userInfo) {
  //       navigate("/");
  //     }
  //   });

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
          sx={{ height: "100", backgroundColor: "#FFCE26" }}
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
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                padding: 0,
                gap: 3,
              }}
            >
              <Card sx={{ minWidth: 275, height: 212.7 }}>
                <CardContent sx={{ height: 133.95 }}>
                  <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                    CS1010S
                  </Typography>
                  <Typography variant="h5" component="div">
                    Programming Methodology
                  </Typography>
                </CardContent>
                <CardActions sx={{ flexDirection: "column" }}>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
              <Card sx={{ minWidth: 275, height: 212.7 }}>
                <CardContent sx={{ height: 133.95 }}>
                  <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                    AC5001
                  </Typography>
                  <Typography variant="h5" component="div">
                    Architectural History of Singapore
                  </Typography>
                </CardContent>
                <CardActions sx={{ flexDirection: "column" }}>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
              <Card sx={{ minWidth: 275, height: 212.7 }}>
                <CardContent sx={{ height: 133.95 }}>
                  <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                    AC5002
                  </Typography>
                  <Typography variant="h5" component="div">
                    Conservation Approaches and Philosophies
                  </Typography>
                </CardContent>
                <CardActions sx={{ flexDirection: "column" }}>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
              <Card sx={{ minWidth: 275, height: 212.7 }}>
                <CardContent sx={{ height: 133.95 }}>
                  <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                    AC5003
                  </Typography>
                  <Typography variant="h5" component="div">
                    Urban Conservation and Regeneration
                  </Typography>
                </CardContent>
                <CardActions sx={{ flexDirection: "column" }}>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                padding: 0,
                gap: 3,
              }}
            >
              <Card sx={{ minWidth: 275, height: 212.7 }}>
                <CardContent sx={{ height: 133.95 }}>
                  <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                    CS1010S
                  </Typography>
                  <Typography variant="h5" component="div">
                    Programming Methodology
                  </Typography>
                </CardContent>
                <CardActions sx={{ flexDirection: "column" }}>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
              <Card sx={{ minWidth: 275, height: 212.7 }}>
                <CardContent sx={{ height: 133.95 }}>
                  <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                    AC5001
                  </Typography>
                  <Typography variant="h5" component="div">
                    Architectural History of Singapore
                  </Typography>
                </CardContent>
                <CardActions sx={{ flexDirection: "column" }}>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
              <Card sx={{ minWidth: 275, height: 212.7 }}>
                <CardContent sx={{ height: 133.95 }}>
                  <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                    AC5002
                  </Typography>
                  <Typography variant="h5" component="div">
                    Conservation Approaches and Philosophies
                  </Typography>
                </CardContent>
                <CardActions sx={{ flexDirection: "column" }}>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
              <Card sx={{ minWidth: 275, height: 212.7 }}>
                <CardContent sx={{ height: 133.95 }}>
                  <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                    AC5003
                  </Typography>
                  <Typography variant="h5" component="div">
                    Urban Conservation and Regeneration
                  </Typography>
                </CardContent>
                <CardActions sx={{ flexDirection: "column" }}>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                padding: 0,
                gap: 3,
              }}
            >
              <Card sx={{ minWidth: 275, height: 212.7 }}>
                <CardContent sx={{ height: 133.95 }}>
                  <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                    CS1010S
                  </Typography>
                  <Typography variant="h5" component="div">
                    Programming Methodology
                  </Typography>
                </CardContent>
                <CardActions sx={{ flexDirection: "column" }}>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
              <Card sx={{ minWidth: 275, height: 212.7 }}>
                <CardContent sx={{ height: 133.95 }}>
                  <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                    AC5001
                  </Typography>
                  <Typography variant="h5" component="div">
                    Architectural History of Singapore
                  </Typography>
                </CardContent>
                <CardActions sx={{ flexDirection: "column" }}>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
              <Card sx={{ minWidth: 275, height: 212.7 }}>
                <CardContent sx={{ height: 133.95 }}>
                  <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                    AC5002
                  </Typography>
                  <Typography variant="h5" component="div">
                    Conservation Approaches and Philosophies
                  </Typography>
                </CardContent>
                <CardActions sx={{ flexDirection: "column" }}>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
              <Card sx={{ minWidth: 275, height: 212.7 }}>
                <CardContent sx={{ height: 133.95 }}>
                  <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                    AC5003
                  </Typography>
                  <Typography variant="h5" component="div">
                    Urban Conservation and Regeneration
                  </Typography>
                </CardContent>
                <CardActions sx={{ flexDirection: "column" }}>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Pagination count={10} showFirstButton showLastButton />
            </Box>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
