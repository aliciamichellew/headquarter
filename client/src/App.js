import "./styles.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Routing from "./components/routing/Routes";
import Landing from "./components/auth/LoginPage";

import Home from "./components/home/Home";
import Login from "./components/auth/LoginPage";
import SignUp from "./components/auth/SignUpPage";
import Profile from "./components/Profile";

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
          {/* <Route component={Routing} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
