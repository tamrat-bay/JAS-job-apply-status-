import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Redirect, Link } from 'react-router-dom';
import useToggle from '../../hooks/useToggleState';
import { useFormik } from 'formik';
import axios from 'axios';
import { useObserver } from "mobx-react";
import { useJasStore } from "../../context/JasStoreContext";
import './Login.css';


const Login = () => {

    const [validationFlag, setValidationFlag] = useToggle(false);
    const [loginFlag, setloginFlag] = useToggle(false);
    const jasStore  = useJasStore();

    const handleSubmit = (values) => {

        axios.post('/users/login/', values)
            .then((response) => {
                if (response.status === 200) {

                    const { name, id, email, image, token } = response.data;
                    const user = { name, id, email, image, token };
                    localStorage.jas_login = JSON.stringify(user);
                    jasStore.setIsUserLogged()
                    setloginFlag();
                } else {
                    setValidationFlag();
                };
            })
            .catch((error) => {
                setValidationFlag();
                console.log(error);
            });
    };

    const formik = useFormik({
        initialValues:
        {
            email: '',
            password: ''
        },
        onSubmit: values => {

            handleSubmit(values);
        },
    });


    const handleChange = (e) => {
        if (validationFlag) {
            setValidationFlag();
        };
        formik.handleChange(e);
    };


    return useObserver(() => {
        if (loginFlag) return <Redirect to='/applies' />;
        return (
        <div className='Login'>
            <Form
                onSubmit={formik.handleSubmit}
                className='Login_form'>
                <div className='form-title'>
                    <h2>Welcome to JAS</h2>
                    <p>Login here</p>
                </div>

                {validationFlag ?
                    <p
                        className='validation-warning'
                        onClick={setValidationFlag}>Please try again. <br />
                             Make sure user Email and Password are correct
                    </p>
                    :
                    ''}

                <Form.Group as={Row} controlId='formHorizontalEmail'>
                    <Col sm={12}>
                        <Form.Control
                            type='email'
                            onChange={handleChange}
                            value={formik.values.email}
                            required
                            autoComplete='false'
                            placeholder='email'
                            name='email'
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId='formHorizontalPassword'>
                    <Col sm={12}>
                        <Form.Control
                            type='password'
                            onChange={handleChange}
                            value={formik.values.password}
                            required
                            autoComplete='true'
                            placeholder='password'
                            name='password'
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 12 }}>
                        <div className='form-group button'>
                            <Button type='submit'>Login</Button>
                            <p><Link to='/forgotpassword'>Forgot password ?</Link></p>
                            <p><Link to='/signup'>Don`t have an account ?</Link></p>
                        </div>
                    </Col>
                </Form.Group>
            </Form>
        </div>)
    });
};
export default Login;