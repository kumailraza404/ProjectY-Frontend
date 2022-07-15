import React from "react";
import "./App.css";
import { Container } from "@mui/material";
import AppBar from "./components/app-bar";
import Landing from "./pages/landing";
import MyNfts from "./pages/mynfts";
import MyBids from "./pages/mybids";
import Footer from "./components/footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  palette: {
    secondary: {
      main: "#FFFFFF80",
    },
    primary: {
      main: "#FFFFFF",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          color: "#FFFFFF",
        },
      },
    },
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
              <Route path="/mynfts" element={<MyNfts />} />
              <Route path="/mybids" element={<MyBids />} />
            </Routes>
            <Footer />
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
