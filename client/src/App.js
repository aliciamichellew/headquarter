import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import SignUpPage from "./components/auth/SignUpPage";
import Home from "./components/home/Home";
import * as React from "react";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Home />
      </div>
    </BrowserRouter>
  );
}
