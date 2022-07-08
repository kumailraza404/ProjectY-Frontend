import React from "react";
import "./App.css";
import { Container } from "@mui/material";
import AppBar from "./components/app-bar";
import Landing from "./pages/landing";
import MyNft from "./pages/mynft";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppBar />
        <Container>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/mynft" element={<MyNft />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
