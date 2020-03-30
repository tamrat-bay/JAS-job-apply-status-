import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApplyTable from './Components/ApplyTable/ApplyTable';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavbarComp from './Components/NavbarComp/NavbarComp';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <NavbarComp  />
  <h1>Job Apply Status</h1>
      <Container>
      <Switch>
      <Route exact path='/' component={ApplyTable}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/signup' component={Signup}/>
      </Switch>
      </Container>
     </BrowserRouter>
    </div>
  )
}

export default App;
