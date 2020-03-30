import React, { Component } from 'react';
import './Login.css'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
import useToggle from '../hooks/useToggleState'


function Login() {
    const [validationFlag, setValidationFlag] = useToggle(false);

    let loginData = { email: '', password: '' }

    const getInputsData = (e, type) => {
        return type === 'email' ? loginData.email = e.target.value :
            loginData.password = e.target.value
    }
    const loginRequest = (e) => {
        e.preventDefault();
        console.log(loginData);

        axios.post('/users/login/', loginData)
            .then((response) => {
                if (response.status === 200) {
                    const { name, id, email, image, token } = response.data;
                    const user = { name, id, email, image, token };
                    localStorage.jas_login = JSON.stringify(user);

                } else {
                    setValidationFlag()
                }
            })
            .catch((error) => {
                setValidationFlag()
                console.log(error);
            });
    }

    return (
        <div className='Login'>
            {validationFlag ?
                <Alert variant='warning' onClick={setValidationFlag}>
                    Please try again.
                        <p>Make sure user Email and Password are correct</p>
                    <p>
                        <Alert.Link >Click here to close this window</Alert.Link>
                    </p>
                </Alert> : ''}
            <h2>Login</h2>
            <Form onSubmit={(e) => loginRequest(e)} className="Login_form">
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Email
                        </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="email" onChange={(e) => getInputsData(e, 'email')} placeholder="Email" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Password
                        </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password" onChange={(e) => getInputsData(e, 'password')} placeholder="Password" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button className='buttons' type="submit" >Login</Button>
                        <Button className='buttons' name="login" href="/">Return</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
};
export default Login;