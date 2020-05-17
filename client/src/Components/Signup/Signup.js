import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import useToggle from '../../hooks/useToggleState';
import { useFormik } from 'formik';
import './Signup.css';

const Signup = () => {

  const [signupFlag, setsignupFlag] = useToggle(false);
  const [validationFlag, setValidationFlag] = useToggle(false);

  const handleSubmit = (values) => {
    if (values.password === values.confirmPassword ) {
      axios.post('/users/register', values)
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
    }
  };

    const formik = useFormik({
      initialValues:
      {
       userName: '',
       email: '',
       password: '',
       confirmPassword: ''
      }
      ,
      onSubmit: values => {
          // console.log("form value signup ", values);
          handleSubmit(values);
      },
  });

  const handleChange = (e) => {
    if (validationFlag) {
        setValidationFlag()
    }
      formik.handleChange(e)
  };


  if (signupFlag) return <Redirect to="Login" />;

  return (
    <div className='Signup'>

        <Form 
         onSubmit={formik.handleSubmit}
         className='Signup_form'
         >
          <div className="form-title">
            <h2>Welcome to JAS</h2>
            <p>Signup here</p>
          </div>

          {validationFlag ?
             <p
              className="validation-warning"
              onClick={setValidationFlag}
              >
                Please try again. <br />
                 Make sure both password are the same
              </p>
            :
            ''}

          <Form.Group as={Row} controlId="formHorizontalUserName">
            <Form.Label column sm={2}>
              {/* User Name */}
            </Form.Label>
            <Col sm={12}>
              <Form.Control 
                onChange={handleChange} 
                minLength="3" 
                name="userName" 
                type="text" 
                placeholder="User name" 
                autoComplete="false"
                required 
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              {/* Email */}
            </Form.Label>
            <Col sm={12}>
              <Form.Control 
                onChange={handleChange} 
                minLength="5" 
                name="email" 
                type="email" 
                placeholder="Email" 
                autoComplete="false"
                required 
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
              {/* Password */}
            </Form.Label>
            <Col sm={12}>
              <Form.Control 
                type="password" 
                onChange={handleChange} 
                minLength="4" 
                name="password" 
                placeholder="Password" 
                autoComplete="true"
                required
               />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalConfirmPassword">
            <Form.Label column sm={2}>
              {/* Confirm Password */}
            </Form.Label>
            <Col sm={12}>
              <Form.Control type="password" 
                onChange={handleChange} 
                minLength="4" 
                name="confirmPassword" 
                placeholder="Confirm Password" 
                autoComplete="true"
                required
               />
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



