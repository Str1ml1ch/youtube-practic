import React,{useContext} from "react";
import * as ReactBootstrap from "react-bootstrap"
import {NavLink} from "react-router-dom"
import "../css/Navbar.css"
import { AuthContext } from '../context/AuthContext'


export const Navigationbar = () =>
{
    const auth = useContext(AuthContext)
    const logoutToogle = () =>
    {
        auth.logout()
    }
    return(
    <ReactBootstrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
        <ReactBootstrap.Navbar.Brand className="NavigationLogo">Youtube Practic</ReactBootstrap.Navbar.Brand>
        <ReactBootstrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootstrap.Navbar.Collapse id="responsive-navbar-nav">
            <ReactBootstrap.Nav className="mr-auto">
              <ReactBootstrap.Nav.Link><NavLink to="/find" className="NavLinks">Find</NavLink></ReactBootstrap.Nav.Link>
               <ReactBootstrap.Nav.Link><NavLink to="/likes" className = "NavLinks">Likes</NavLink></ReactBootstrap.Nav.Link>
    </ReactBootstrap.Nav> 
            <ReactBootstrap.Nav className="exitbutt" onClick={logoutToogle}>Exit</ReactBootstrap.Nav>
        </ReactBootstrap.Navbar.Collapse>
    </ReactBootstrap.Navbar>);
}