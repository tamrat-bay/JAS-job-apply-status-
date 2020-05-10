import React from 'react'
import { Navbar ,Nav} from 'react-bootstrap';
import './Navbar.css'

const NavbarBeforeLogin = () => {
    return (
        <div className=" Navbar NavbarBeforeLogin">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        {/* <Nav.Link href="/applies">Applies</Nav.Link> */}
                    </Nav>
                    <Nav className="mr-auto">
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/signup">Sign Up</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavbarBeforeLogin
