import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Landing from "./components/auth/LoginPage";

import Home from "./components/home/Home";
import Login from "./components/auth/LoginPage";
import SignUp from "./components/auth/SignUpPage";
import Profile from "./components/Profile";
import AllModules from "./components/modules/AllModules";
import ProfilePage from "./components/profile/ProfilePage";

const theme = createTheme({
  typography: {
    fontFamily: ["Berlin Sans FB"].join(","),
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/allmodules" element={<AllModules />} />
          <Route path="/profilepage" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
