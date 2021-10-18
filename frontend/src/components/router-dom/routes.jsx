import React from 'react'
import {Route, Switch} from "react-router-dom";
import Login from "../pages/sign-in";
import Register from "../pages/sign-up";
import LandingPage from "../pages/home";
import EditTime from "../pages/edit-time";
import ChangePassward from "../form/changepw";
import UserDashboard from "../pages/dashboard";
import UserProfile from "../pages/profile"

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
             <Route path="/edit-time"  exact>
                 <EditTime/>
            </Route>
            <Route path="/change-pw"  exact>
                 <ChangePassward/>
            </Route>
            <Route path="/dashboard" exact>
                <UserDashboard/>
            </Route>
            <Route path="/user-profile" exact>
                <UserProfile/>
            </Route>

        </Switch>
    )
}

export default RouterSwitch;