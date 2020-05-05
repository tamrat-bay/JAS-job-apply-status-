import React from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavbarComp from './Components/NavbarComp/NavbarComp';
import Home from './Components/Home/Home';
import ApplyTable from './Components/ApplyTable/ApplyTable';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import ForgatPassword from './Components/ForgatPassword/ForgatPassword';
import { IsUserLoggedProvider } from './context/IsUserLoggedContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import ResetPassword from './Components/ResetPassword/ResetPassword';


const App = () => {


  return (
    <div className="App">
      <BrowserRouter>
        <IsUserLoggedProvider>
          <NavbarComp />
          <Container>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/applies' component={ApplyTable} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/forgatpassword' component={ForgatPassword} />
              <Route exact path='/reset/:id' component={ResetPassword} />
            </Switch>
          </Container>
        </IsUserLoggedProvider>
      </BrowserRouter>
    </div>
  )
};
export default App;

