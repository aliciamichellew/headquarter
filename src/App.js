import './App.css';
import React from 'react';
import AllInternship from './components/Internship/AllInternship';
import MyInternship from './components/Internship/MyInternships';
import { createTheme, ThemeProvider } from '@mui/system';
import { BrowserRouter, Routes, Route} from 'react-router-dom';


export default function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Berlin Sans FB"].join(","),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/allinternship" element={<AllInternship />} />
          <Route path="/myinternship" element={<MyInternship />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    
   
  );
}



