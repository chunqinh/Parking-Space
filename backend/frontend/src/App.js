import React, {useEffect} from 'react'
import {BrowserRouter} from "react-router-dom";
import {Container} from "@mui/material";
import Navigation from "./components/navigation/navigation-bar";
import RouterSwitch from "./components/router-dom/routes";
import AuthProvider, {useAuth} from "./context/AuthContext";
import axios from "axios";


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
