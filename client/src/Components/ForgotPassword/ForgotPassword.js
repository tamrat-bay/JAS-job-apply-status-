import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import useToggle from '../../hooks/useToggleState';
import './ForgotPassword.css';


const ForgotPassword = () => {
 
    const [sendEmailFlag, setSendEmailFlag] = useToggle(false)
    const [validationFlag, setValidationFlag] = useToggle(false);

    let userEmail ='';

    const getInputsData = (e) => {
        if (validationFlag) {
            setValidationFlag()
        }
        return e.target.name === 'email' ? userEmail = e.target.value :''
    };

    const ForgotRequest = (e) => {
        e.preventDefault();
        axios.post(`/forgotpassword/${userEmail}`)
        .then(res => {
            if (res.status === 201) {
                setSendEmailFlag()
            }
        })
        .catch(err => {
            setValidationFlag()
            console.log(err)
        })

    }
    
    return (
        <div className="ForgotPassword">
            {!sendEmailFlag ?
            
            <Form onSubmit={ForgotRequest} 
            className="ForgotPassword_form"
            >
                  <div className="form-title">
                      <h2>Forgot Password</h2>
                  </div>

                  {validationFlag ?
                    <p
                        className="validation-warning"
                        onClick={setValidationFlag}>
                             Please try again. <br />
                             There is a problem with your email address
                    </p>
                    :
                    ''}
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        </Form.Label>
                    <Col sm={12}>
                        <Form.Control 
                        type="email" 
                        name='email' 
                        required 
                        onChange={getInputsData} 
                        placeholder="Enter your Email" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Col sm={{ span: 12 }}>
                        <Button className='buttons' type="submit" >Submit</Button>
                    </Col>
                </Form.Group>
            </Form>
                :
                <h3>Reset link was sent to you please check your email to restore your password</h3>
                }
        </div>
    )
}
export default ForgotPassword;