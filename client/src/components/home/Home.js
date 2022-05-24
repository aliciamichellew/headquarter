import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TopDrawer from "../../components/drawer/TopNav";
import SideDrawer from "../../components/drawer/SideNav";
import Grid from "@mui/material/Grid";
import logo from "../../img/logo.png";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Home() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <TopDrawer open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        theme={theme}
      />
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}> */}
      <Box component="main" sx={{ flexGrow: 1, pt: 6 }}>
        <Grid
          container
          component="main"
          sx={{ height: "100vh", backgroundColor: "#FFCE26" }}
        >
          <DrawerHeader />
          <Box
            sx={{
              my: 6,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
              // justifyContent: "center",
            }}
          >
            <Typography
              fontFamily={"Berlin Sans FB"}
              fontSize={35}
              sx={{ mx: 1 }}
              align={"left"}
            >
              Welcome Back,
            </Typography>
            <Typography
              fontFamily={"Berlin Sans FB"}
              fontSize={50}
              sx={{ mx: 1, mt: 0 }}
              align={"left"}
            >
              Alicia Michelle
            </Typography>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
