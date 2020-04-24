import React,{ useContext } from 'react'
import NavbarAfterLogin from './NavbarAfterLogin';
import NavbarBeforeLogin from './NavbarBeforeLogin';
import { IsUserLoggedContext } from '../../context/IsUserLoggedContext'


const NavbarComp = () => { 
   const { isUserLogged } = useContext(IsUserLoggedContext);

  return (
    isUserLogged ? <NavbarAfterLogin  /> :
    <NavbarBeforeLogin />
  )
};
export default NavbarComp;