import React from "react";
import {Switch,Route,Redirect} from "react-router-dom"
import {Find} from "./pages/Find"
import {LikesPage} from "./pages/LikesPage"

export const useRouts = isAuthenticated =>
{
    return(
        <Switch>
            <Route path="/find" exact>
                <Find></Find>
            </Route>
            <Route path="/likes" exact>
                <LikesPage/>
            </Route>
            <Redirect to="/find"></Redirect>
        </Switch>
    )
}