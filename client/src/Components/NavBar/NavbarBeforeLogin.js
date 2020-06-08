import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Navbar.css';


const NavbarBeforeLogin = () => {

    const [expanded, setExpanded] = useState(false);

    return (
        <div className=" Navbar NavbarBeforeLogin">
            <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded}>
                <Navbar.Brand onClick={() => setExpanded(false)} as={Link} to="/">JAS</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")}/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={() => setExpanded(false)} as={Link} to="/about">About</Nav.Link>
                    </Nav>
                    <Nav className="Navbar_logginStatus">
                        <Nav.Link onClick={() => setExpanded(false)} as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link onClick={() => setExpanded(false)} as={Link} to="/signup">Signup</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};
export default NavbarBeforeLogin;