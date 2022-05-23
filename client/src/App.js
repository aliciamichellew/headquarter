import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import Home from "./components/home/Home";
import LoginPage from "./components/auth/LoginPage";
import * as React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <LoginPage />
      </div>
    </BrowserRouter>
  );
}
