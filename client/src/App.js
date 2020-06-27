import React from 'react';
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import About from './Components/About/About';
import Signup from './Components/Signup/Signup';
import ApplyTable from './Components/ApplyTable/ApplyTable';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import { IsUserLoggedProvider } from './context/IsUserLoggedContext'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


const App = () => {

  return (
    <div className='App'>
      <BrowserRouter>
        <IsUserLoggedProvider>
          <NavBar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/applies' component={ApplyTable} />
            <Route exact path='/reset/:id' component={ResetPassword} />
            <Route exact path='/forgotpassword' component={ForgotPassword} />
          </Switch>
          <Footer />
        </IsUserLoggedProvider>
      </BrowserRouter>
    </div>
  );
};
export default App;