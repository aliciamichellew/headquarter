import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { CardHeader, IconButton } from "@mui/material";
import TopDrawer from "./drawer/TopNav";
import SideDrawer from "./drawer/SideNav";
import { styled, useTheme } from "@mui/material/styles";
import { Avatar } from "@mui/material";

const BlackAvatar = styled(Avatar)`
  background-color: black;
`;

function AvatarButton() {
  return (
    <IconButton onClick={() => console.log("hi")}>
      <BlackAvatar>AM</BlackAvatar>
    </IconButton>
  );
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Profile() {
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

  return (
    <Box sx={{ display: "flex" }}>
      <TopDrawer open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        theme={theme}
      />
      <Box component="main" sx={{ flexGrow: 1, pt: 0 }}>
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
              alignItems: "center",
              width: "100%",
            }}
          >
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={8}
              square
              sx={{
                backgroundColor: "#FFCE26",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></Grid>
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              square
              sx={{
                backgroundColor: "#FFCE26",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  mt: 10,
                  my: 6,
                  mx: 4,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Card sx={{ mx: 5 }}>
                  <Typography
                    fontFamily={"Berlin Sans FB"}
                    fontSize={24}
                    sx={{ mx: 14, my: 2 }}
                  >
                    Profile
                  </Typography>
                  <AvatarButton />

                  <CardContent>
                    <Box sx={{ mt: 0 }}>
                      <Typography
                        fontFamily={"Berlin Sans FB"}
                        fontSize={14}
                        sx={{ my: 0 }}
                      >
                        First Name
                        <Box>Alicia</Box>
                      </Typography>

                      <Typography
                        fontFamily={"Berlin Sans FB"}
                        fontSize={14}
                        sx={{ my: 2 }}
                      >
                        Last Name
                        <Box>Michelle</Box>
                      </Typography>

                      <Typography
                        fontFamily={"Berlin Sans FB"}
                        fontSize={14}
                        sx={{ my: 2 }}
                      >
                        Username
                        <Box>Alicia Michelle</Box>
                      </Typography>
                      <Typography
                        fontFamily={"Berlin Sans FB"}
                        fontSize={14}
                        sx={{ my: 2 }}
                      >
                        Email Address
                        <Box>e0000000@u.nus.edu</Box>
                      </Typography>

                      <Typography
                        fontFamily={"Berlin Sans FB"}
                        fontSize={14}
                        sx={{ my: 2 }}
                      >
                        About Me
                        <Box sx={{ width: "100%" }}>
                          I am taking business analytics as my major.
                        </Box>
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Box component="form" sx={{ mt: 0, mx: 10 }}>
                      <Button
                        type="submit"
                        fullWidth="100%"
                        variant="contained"
                        sx={{
                          mt: 2,
                          mb: 0,
                          color: "#000000",
                          backgroundColor: "#FFCE26",
                        }}
                      >
                        Edit Profile
                      </Button>
                    </Box>
                  </CardActions>
                </Card>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
