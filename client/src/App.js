import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApplyTable from './Components/ApplyTable/ApplyTable';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavbarComp from './Components/NavbarComp/NavbarComp';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import { IsUserLoggedProvider } from './context/IsUserLoggedContext'


function App() {


  return (
    <div className="App">
      <BrowserRouter>
      <IsUserLoggedProvider> 
        <NavbarComp />
        <Container>
          <Switch>
            <Route exact path='/' component={ Home } />
            <Route exact path='/applies' component={ ApplyTable } />
            <Route exact path='/login' component={ Login } />
            <Route exact path='/signup' component={ Signup}  />
          </Switch>
        </Container>
        </IsUserLoggedProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;
