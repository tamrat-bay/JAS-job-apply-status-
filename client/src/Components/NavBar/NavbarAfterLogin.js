import React, { useState } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useObserver } from "mobx-react";
import { useJasStore } from "../../context/JasStoreContext";

const NavbarAfterLogin = () => {
    const [expanded, setExpanded] = useState(false);
    const user = JSON.parse(localStorage.jas_login);
    const jasStore  = useJasStore()

    const logout = () => {
        localStorage.clear();
        jasStore.setIsUserLogged()
    };

    return useObserver(() =>
        <div className='Navbar'>
            <Navbar bg='dark' variant='dark' expand='lg' expanded={expanded}>
                <Navbar.Brand as={Link} to='/'>JAS</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' onClick={() => setExpanded(expanded ? false : "expanded")}/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto'>
                        <Nav.Link onClick={() => setExpanded(false)} as={Link} to='/applies'>Applies</Nav.Link>
                        <Nav.Link onClick={() => setExpanded(false)} as={Link} to='/about'>About</Nav.Link>
                    </Nav>
                    <Nav className='Navbar_logginStatus'>
                        <div><strong>Welcome {user.name}!</strong></div>
                        <Nav.Link onClick={() => {
                            setExpanded(false)
                            logout();
                        }} as={Link} to='/'>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};
export default NavbarAfterLogin;