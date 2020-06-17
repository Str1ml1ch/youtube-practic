import React from "react";
import {Switch,Route,Redirect, Router} from "react-router-dom"
import {Find} from "./pages/Find"
import {LikesPage} from "./pages/LikesPage"
import {Login} from './pages/Login'
import { Register } from './pages/Register'

export const useRouts = isAuthenticated =>
{
    if(isAuthenticated)
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
    return(
        <Switch>
        <Route path="/login" exact>
        <Login/>
    </Route>
    <Route path="/register" exact>
        <Register/>
    </Route>
    <Redirect to="/login"></Redirect>
    </Switch>
    )
}