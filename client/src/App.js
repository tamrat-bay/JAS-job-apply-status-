import React from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavbarComp from './Components/NavbarComp/NavbarComp';
import Home from './Components/Home/Home';
import ApplyTable from './Components/ApplyTable/ApplyTable';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import { IsUserLoggedProvider } from './context/IsUserLoggedContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import './App.css'


const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <IsUserLoggedProvider>
          <NavbarComp />
          <div className="App_body">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/applies' component={ApplyTable} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/forgotpassword' component={ForgotPassword} />
              <Route exact path='/reset/:id' component={ResetPassword} />
            </Switch>
          </div>
        </IsUserLoggedProvider>
      </BrowserRouter>
    </div>
  )
};
export default App;

