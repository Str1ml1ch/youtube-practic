import React from "react";
import {Navbar} from "react-bootstrap"

export const Footer = () =>
{
    return(
            <Navbar bg="dark" fixed="bottom" sticky="bottom" className="NavBottom">
                <Navbar.Brand>
                    <img
                        src="http://pngimg.com/uploads/youtube/youtube_PNG10.png"
                        width="40"
                        height="40"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Navbar.Brand><a className="bottomNav">© All rights reserved</a></Navbar.Brand>
            </Navbar>
    )
}