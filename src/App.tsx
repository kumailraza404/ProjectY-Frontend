import React from "react";
import "./App.css";
import { Container } from "@mui/material";
import AppBar from "./components/app-bar";
import Landing from "./pages/landing";

function App() {
  return (
    <div className="App">
      <AppBar />
      <Container>
        <Landing />
      </Container>
    </div>
  );
}

export default App;
