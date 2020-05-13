import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Redirect, Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert'
import useToggle from '../../hooks/useToggleState';
import { IsUserLoggedContext } from '../../context/IsUserLoggedContext'
import axios from 'axios';
import './Login.css';


const Login = () => {

    const [validationFlag, setValidationFlag] = useToggle(false);
    const [loginFlag, setloginFlag] = useToggle(false);
    const { isUserLogged, setisUserLogged } = useContext(IsUserLoggedContext);

    console.log("isUserLogged", isUserLogged);

    let loginData = { email: '', password: '' }

    const getInputsData = (e, type) => {
        if (validationFlag) {
            setValidationFlag()
        }

        return type === 'email' ? loginData.email = e.target.value :
            loginData.password = e.target.value
    };

    const loginRequest = (e) => {
        e.preventDefault();
        console.log(loginData);

        axios.post('/users/login/', loginData)
            .then((response) => {
                if (response.status === 200) {
                    const { name, id, email, image, token } = response.data;
                    const user = { name, id, email, image, token };
                    localStorage.jas_login = JSON.stringify(user);
                    // setisUserLogged( true )
                    setisUserLogged(true)
                    setloginFlag()
                } else {
                    setValidationFlag()

                }
            })
            .catch((error) => {
                setValidationFlag()

                console.log(error);
            });
    }

    if (loginFlag) return <Redirect to="/applies" />;

    return (
        <div className='Login'>

            <Form onSubmit={(e) => loginRequest(e)} className="Login_form">
                <div className="form-title">
                    <h2>Welcome to JAS</h2>
                    <p>Login here</p>
                </div>

                {validationFlag ?
                    <p
                        className="validation-warning"
                        onClick={setValidationFlag}>Please try again. <br />
                             Make sure user Email and Password are correct
                    </p>
                    :
                    ''}

                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={0}>
                    </Form.Label>
                    <Col sm={12}>
                        <Form.Control
                            type="email"
                            onChange={(e) => getInputsData(e, 'email')} placeholder="Email" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        {/* <div>Password</div> */}
                    </Form.Label>
                    <Col sm={12}>
                        <Form.Control
                            type="password"
                            onChange={(e) => getInputsData(e, 'password')}
                            required
                            placeholder="Password" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 12 }}>
                        <div className='form-group button'>
                            <Button type="submit" >Login</Button>
                            <p><Link to='/forgotpassword'>Forgot password ?</Link></p>
                            <p><Link to='/signup'>Don`t have an account ?</Link></p>
                        </div>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
};
export default Login;