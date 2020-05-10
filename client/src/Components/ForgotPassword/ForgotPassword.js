import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './ForgotPassword.css';


const ForgotPassword = () => {

    let ForgotEmail ;

    const getInputsData = (e) => {
        return e.target.name === 'email' ? ForgotEmail = e.target.value :''
    };

    const ForgotRequest = (e) => {
        e.preventDefault();
        axios.post(`/forgotpassword/${ForgotEmail}`)
        .then(res => {
            if (res.status === 201) {
                console.log(res.data);
            }
        })
        .catch(err => console.log(err))

    }
    
    return (
        <div className="ForgotPassword">
            <h1>ForgotPassword</h1>
            <Form onSubmit={(e) => ForgotRequest(e)} className="Login_form">
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Email
                        </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="email" name='email' onChange={(e) => getInputsData(e)} placeholder="Email" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button className='buttons' type="submit" >Submit</Button>
                    </Col>
                </Form.Group>
            </Form>

        </div>
    )
}
export default ForgotPassword;