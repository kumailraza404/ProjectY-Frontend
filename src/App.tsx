import React from "react";
import "./App.css";
import { Container } from "@mui/material";
import AppBar from "./components/app-bar";
import Landing from "./pages/landing";
// import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles'


const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif'
    ].join(','),
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
      <AppBar />
      <Container>
        <Landing />
      </Container>
    </div>
    </ThemeProvider>
    
  );
}

export default App;
