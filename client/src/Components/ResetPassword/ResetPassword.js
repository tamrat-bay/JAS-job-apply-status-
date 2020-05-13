import React from 'react';
import { Button, Row, Col, Form, Alert } from 'react-bootstrap';
import useToggle from '../../hooks/useToggleState';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './ResetPassword.css'

const ResetPassword = (props) => {

    const [resetFlag, setResetFlag] = useToggle(false);
    const [validationFlag, setValidationFlag] = useToggle(false);

    let resetData = { password: '', confirmPassword: '', id: props.match.params.id }

    const getInputsData = (e) =>{
        if (validationFlag) {
            setValidationFlag()
        }
      return resetData[e.target.name] = e.target.value
        }

    const ResetRequest = (e) => {
        e.preventDefault();
        console.log(resetData);
        if (resetData.password === resetData.confirmPassword && resetData.password.length) {
            axios.patch('/reset', resetData)
                .then((response) => {
                    if (response.status === 204) {
                        setResetFlag()
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setValidationFlag()
        }
    }

    if (resetFlag) return <Redirect to='/login' />

    return (
        <div className='ResetPassword'>
            <Form onSubmit={(e) => ResetRequest(e)} className="Login_form">
             {validationFlag ?
                    <p
                        className="validation-warning"
                        onClick={setValidationFlag}>Please try again. <br />
                                 There is a problem with your password !

                    </p>
                    :
                    ''}
                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        </Form.Label>
                    <Col sm={12}>
                        <Form.Control 
                        type="password" 
                        onChange={(e) => getInputsData(e)} 
                        name='password' 
                        placeholder="Password"
                        requierd
                        />
                    </Col>
                </Form.Group>


                <Form.Group as={Row} controlId="formHorizontalconfirmPassword">
                    <Form.Label column sm={2}>
                        </Form.Label>
                    <Col sm={12}>
                        <Form.Control type="password" 
                        onChange={(e) => getInputsData(e)} 
                        name='confirmPassword' 
                        placeholder="Confirm Password"
                        requierd
                         />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 12}}>
                        <Button className='buttons' type="submit" >Reset</Button>
                    </Col>
                </Form.Group>

            </Form>

        </div>
    )
}

export default ResetPassword






