import React from 'react'
import {BrowserRouter} from "react-router-dom";
import {Container} from "@mui/material";
import Navigation from "./components/navigation/navigation-bar";
import RouterSwitch from "./components/router-dom/routes";


function App() {
  return (
      <BrowserRouter>
          <Container>
              <Navigation/>
              <RouterSwitch/>
          </Container>
      </BrowserRouter>
  );
}

export default App;
