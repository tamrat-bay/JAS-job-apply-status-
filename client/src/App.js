import React from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import ApplyTable from './components/ApplyTable/ApplyTable';
import NavbarComp from './components/NavbarComp/NavbarComp';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComp />
        <h1>Job Apply Status</h1>
        <Container>
          <Switch>
            <Route exact path='/' component={ApplyTable} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
          </Switch>
        </Container>
      </BrowserRouter>
    </div>
  )
};
export default App;

