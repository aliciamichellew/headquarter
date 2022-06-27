import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "../home/Home";
import Login from "../auth/LoginPage";
import SignUp from "../auth/SignUpPage";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routes;