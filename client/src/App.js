import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import SignUpPage from "./components/auth/SignUpPage";
import Home from "./components/home/Home";
import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Berlin Sans FB"].join(","),
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <SignUpPage />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
