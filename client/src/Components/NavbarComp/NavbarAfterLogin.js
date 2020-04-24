import React, { useContext } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { IsUserLoggedContext } from '../../context/IsUserLoggedContext'

const NavbarAfterLogin = () => {
    const { setisUserLogged } = useContext(IsUserLoggedContext);

    const logout = () => {
        localStorage.clear();
        setisUserLogged(false)
    }

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/applies">Applies</Nav.Link>
                    </Nav>
                    <Nav className="mr-auto">
                        <span>Hello</span>
                        <Nav.Link onClick={logout} href="#">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavbarAfterLogin
