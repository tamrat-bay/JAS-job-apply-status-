import React from 'react';
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import ApplyTable from './Components/ApplyTable/ApplyTable';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import { IsUserLoggedProvider } from './context/IsUserLoggedContext'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ResetPassword from './Components/ResetPassword/ResetPassword';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import About from './Components/About/About';


const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <IsUserLoggedProvider>
          <NavBar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/applies' component={ApplyTable} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/about' component={About} />
            <Route exact path='/forgotpassword' component={ForgotPassword} />
            <Route exact path='/reset/:id' component={ResetPassword} />
          </Switch>
          <Footer />
        </IsUserLoggedProvider>
      </BrowserRouter>
    </div>
  )
};
export default App;