import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import useToggle from '../../hooks/useToggleState';
import './Signup.css';

const Signup = () => {

  const [signupFlag, setsignupFlag] = useToggle(false);
  const [validationFlag, setValidationFlag] = useToggle(false);
  
  let signUpData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const getInputsData = (e) => {
    if (validationFlag) {
      setValidationFlag()
  }
    signUpData[e.target.name] = e.target.value; // get every input data (w onChange)
  };

  const signUpRequest = (e) => {
    e.preventDefault()
    if (signUpData.password === signUpData.confirmPassword && !signUpData.name.match(/ /g)) {
      e.preventDefault();
      axios.post('/users/register', signUpData)
        .then((response) => {
          if (response.status === 201) {
            setsignupFlag()
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setValidationFlag()
      e.preventDefault()
    }
  };

  if (signupFlag) return <Redirect to="Login" />;

  return (
    <div className='Signup'>
      {/* {validationFlag ?
        <Alert variant='warning' onClick={setValidationFlag}>
          Please try again.
          make sure user contains only alphanumeric symbols
          and that both passwords match
          <p>
            <Alert.Link >Click here to close this window</Alert.Link>
          </p>
        </Alert> : ''} */}

       
      
      <Form onSubmit={(e) => signUpRequest(e)} className='Signup_form'>
        <div class="form-title">
                  <h2>Welcome to JAS</h2>
                  <p>Signup here</p>
              </div>

              {validationFlag ?
                    <p
                        className="validation-warning"
                        onClick={setValidationFlag}>Please try again. <br />
                            Make sure both password are the same
                    </p>
                    :
                    ''}
        <Form.Group as={Row} controlId="formHorizontalUserName">
          <Form.Label column sm={2}>
            {/* User Name */}
          </Form.Label>
          <Col sm={12}>
            <Form.Control onChange={(e) => getInputsData(e)} minLength="3" name="name" type="text" placeholder="User Name" required />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            {/* Email */}
         </Form.Label>
          <Col sm={12}>
            <Form.Control onChange={(e) => getInputsData(e)} minLength="5" name="email" type="email" placeholder="Email" required />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            {/* Password */}
          </Form.Label>
          <Col sm={12}>
            <Form.Control type="password" onChange={(e) => getInputsData(e)} minLength="4" name="password" placeholder="Password" required />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            {/* Confirm Password */}
          </Form.Label>
          <Col sm={12}>
            <Form.Control type="password" onChange={(e) => getInputsData(e)} minLength="4" name="confirmPassword" placeholder="Confirm Password" required />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 12 }}>
            <Button type="submit">Signup</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};
export default Signup;



