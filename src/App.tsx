import React from "react";
import "./App.css";
import { Container } from "@mui/material";
import AppBar from "./components/app-bar";
import Landing from "./pages/landing";
// import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';


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
