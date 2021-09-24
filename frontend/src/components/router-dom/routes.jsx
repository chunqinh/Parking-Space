import React from 'react'
import {Route, Switch} from "react-router-dom";
import Login from "../pages/sign-in";
import Register from "../pages/sign-up";
import LandingPage from "../pages/home";

function RouterSwitch(){
    return(
        <Switch>
            <Route path="/sign-in">
                <Login/>
            </Route>
            <Route path="/sign-up">
                <Register/>
            </Route>
            <Route path="/" exact>
                <LandingPage/>
            </Route>

        </Switch>
    )
}

export default RouterSwitch;