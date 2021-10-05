import React from 'react'
import {Route, Switch} from "react-router-dom";
import Login from "../pages/sign-in";
import Register from "../pages/sign-up";
import LandingPage from "../pages/home";
import EditTime from "../form/edittime";
import ChangePassward from "../form/changepw";

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
             <Route path="/edittime"  exact>
                 <EditTime/>
            </Route>
            <Route path="/changepw"  exact>
                 <ChangePassward/>
            </Route>

    

        </Switch>
    )
}

export default RouterSwitch;