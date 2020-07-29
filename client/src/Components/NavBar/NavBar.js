import React from 'react'
import NavbarAfterLogin from './NavbarAfterLogin';
import NavbarBeforeLogin from './NavbarBeforeLogin';
import { useObserver } from "mobx-react";
import { useJasStore } from "../../context/JasStoreContext";

const NavbarComp = () => { 
  const jasStore  = useJasStore();
  
  return useObserver(() =>
    jasStore.isUserLogged ? <NavbarAfterLogin  /> :
    <NavbarBeforeLogin />
  )
};
export default NavbarComp;