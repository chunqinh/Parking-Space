import React from 'react'
import {BrowserRouter} from "react-router-dom";
import {Container} from "@mui/material";
import Navigation from "./components/navigation/navigation-bar";
import RouterSwitch from "./components/router-dom/routes";
import AuthProvider from "./context/AuthContext";


function App() {
  return (

          <BrowserRouter>
              <AuthProvider>
                  <Container>
                      <Navigation/>
                      <RouterSwitch/>
                  </Container>
              </AuthProvider>
          </BrowserRouter>
  );
}

export default App;
