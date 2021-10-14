import React from 'react'
import {Route, Switch} from "react-router-dom";
import Login from "../pages/sign-in";
import Register from "../pages/sign-up";
import LandingPage from "../pages/home";
import EditTime from "../pages/edit-time";
import ChangePassward from "../form/changepw";
<<<<<<< HEAD
import UserDashboard from "../pages/dashboard";
<<<<<<< HEAD
import UserProfile from "../pages/profile";
=======
>>>>>>> parent of 392c45b (Issue #32 - Dashboard for Users)
=======
>>>>>>> parent of f565482 (Issue #31 and #34 - Profile page and User Info Tab)

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
<<<<<<< HEAD
            <Route path="/dashboard"  exact>
                <UserDashboard/>
            </Route>
<<<<<<< HEAD
            <Route path="/profile"  exact>
                <UserProfile/>
            </Route>
=======
>>>>>>> parent of 392c45b (Issue #32 - Dashboard for Users)
=======
>>>>>>> parent of f565482 (Issue #31 and #34 - Profile page and User Info Tab)

    

        </Switch>
    )
}

export default RouterSwitch;