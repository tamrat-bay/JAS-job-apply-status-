import React from 'react'
import { Navbar ,Nav} from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Navbar.css'

const NavbarBeforeLogin = () => {
    return (
        <div className=" Navbar NavbarBeforeLogin">
            <Navbar bg="dark"  variant="dark" expand="lg">
             <Navbar.Brand as={Link} to="/">JAS</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/about">About</Nav.Link>
                    </Nav>
                    <Nav className="Navbar_logginStatus">
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavbarBeforeLogin
