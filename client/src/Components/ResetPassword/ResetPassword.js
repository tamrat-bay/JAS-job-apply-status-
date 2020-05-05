import React, { useState } from 'react'

import {Button,Row,Col,Form,Alert} from 'react-bootstrap';
import useToggle from '../../hooks/useToggleState';
import { Redirect } from 'react-router-dom'
import axios from 'axios';

const ResetPassword = (props) => {
    const [resetFlag, setResetFlag] = useToggle(false);
    const [validationFlag, setValidationFlag] = useToggle(false);

    let resetData = { password: '', confirmPassword: '', id: props.match.params.id }

    const getInputsData = (e) => resetData[e.target.name] = e.target.value

    const ResetRequest = (e) => {
        e.preventDefault();
        console.log(resetData);
        if (resetData.password === resetData.confirmPassword) {
            axios.patch('/reset/', resetData)
                .then((response) => {
                    if (response.status === 204) {
                        setResetFlag()
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }else{
            setValidationFlag()
        }

    }

    if (resetFlag) return <Redirect to='/login' />

    return (
        <div>
            {validationFlag ?
                <Alert variant='warning' onClick={setValidationFlag}>
                    Please try again.
                        <p>Password dont match</p>
                    <p>
                        <Alert.Link >Click here to close this window</Alert.Link>
                    </p>
                </Alert> : ''}
            <Form onSubmit={(e) => ResetRequest(e)} className="Login_form">

                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Password
                        </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password" onChange={(e) => getInputsData(e)} name='password' placeholder="Password" />
                    </Col>
                </Form.Group>


                <Form.Group as={Row} controlId="formHorizontalconfirmPassword">
                    <Form.Label column sm={2}>
                        confirmPassword
                        </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password" onChange={(e) => getInputsData(e)} name='confirmPassword' placeholder="confirmPassword" />
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
}

export default ResetPassword






