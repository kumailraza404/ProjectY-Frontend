import React from "react";
import "./App.css";
import { Container } from "@mui/material";
import AppBar from "./components/app-bar";
import Landing from "./pages/landing";
import MyNft from "./pages/mynft";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppBar />
          <Container>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/mynft" element={<MyNft />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
