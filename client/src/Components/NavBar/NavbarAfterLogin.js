import React, { useContext } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link} from "react-router-dom";
import { IsUserLoggedContext } from '../../context/IsUserLoggedContext'

const NavbarAfterLogin = () => {
    const { setisUserLogged } = useContext(IsUserLoggedContext);

    const logout = () => {
        localStorage.clear();
        setisUserLogged(false)
    };

    return (
        <div className="Navbar">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand as={Link} to="/">JAS</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/applies">Applies</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                    </Nav>
                    <Nav className="Navbar_logginStatus">
                        <div><strong>Welcome User!</strong></div>
                        <Nav.Link as={Link} onClick={logout} to="/">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
};
export default NavbarAfterLogin
