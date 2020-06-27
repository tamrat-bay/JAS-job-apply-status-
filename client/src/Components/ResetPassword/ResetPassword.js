import React from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import useToggle from '../../hooks/useToggleState';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import './ResetPassword.css'

const ResetPassword = (props) => {

    const [resetFlag, setResetFlag] = useToggle(false);
    const [validationFlag, setValidationFlag] = useToggle(false);

    const handleSubmit = (values) => {
        if ((values.password === values.confirmPassword) && values.password.length) {
            axios.patch('/reset', values)
                .then((response) => {
                    if (response.status === 204) {
                        setResetFlag();
                    };
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setValidationFlag();
        };
    };

    const formik = useFormik({
        initialValues:
        {
            password: '',
            confirmPassword: '',
            id: props.match.params.id
        }
        ,
        onSubmit: values => {
            handleSubmit(values);
        },
    });

    const handleChange = (e) => {
        if (validationFlag) {
            setValidationFlag();
        };
        formik.handleChange(e)
    };

    if (resetFlag) return <Redirect to='/login' />;

    return (
        <div className='ResetPassword'>

            <Form
                onSubmit={formik.handleSubmit}
                className="Login_form"
            >

                <div className="form-title">
                    <h2>Reset Passwoed</h2>
                </div>

                {validationFlag ?
                    <p
                        className="validation-warning"
                        onClick={setValidationFlag}>
                        Please try again. <br />
                            There is a problem with your password !
                    </p>
                    :
                    ''
                }
                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                    </Form.Label>
                    <Col sm={12}>
                        <Form.Control
                            type="password"
                            onChange={handleChange}
                            name='password'
                            placeholder="Password"
                            required
                            autoComplete="true"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalconfirmPassword">
                    <Form.Label column sm={2}>
                    </Form.Label>
                    <Col sm={12}>
                        <Form.Control
                            type="password"
                            onChange={handleChange}
                            name='confirmPassword'
                            placeholder="Confirm Password"
                            required
                            autoComplete="true"
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 12 }}>
                        <Button className='buttons' type="submit" >Reset</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
};

export default ResetPassword;