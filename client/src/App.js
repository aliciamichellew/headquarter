import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Landing from "./components/auth/LoginPage";

import Home from "./components/home/Home";
import Login from "./components/auth/LoginPage";
import SignUp from "./components/auth/SignUpPage";
import Profile from "./components/Profile";
import AllModules from "./components/modules/AllModules";
import ProfilePage from "./components/profile/ProfilePage";
import ModulePage from "./components/modules/ModulePage";
import setAuthToken from "./components/utils/setAuthToken";
import CommentPage from "./posts/CommentPage";
import MyModules from "./components/modules/MyModules";

const theme = createTheme({
  typography: {
    fontFamily: ["Berlin Sans FB"].join(","),
  },
});

export default function App() {
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      setAuthToken(userInfo.token);
    }
  }, [localStorage.getItem("userInfo")]);
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
          <Route path="/mymodules" element={<MyModules />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/modules/:moduleCode" element={<ModulePage />} />
          <Route path="/commentpage/:postId" element={<CommentPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
