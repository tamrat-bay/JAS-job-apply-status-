import React, { Component } from 'react';
import './Login.css'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'

class Login extends Component {
    state = { validationFlag: false}
    
    loginData = {email:'', password:''}

    getInputsData = (e,type)=>{
      return type === 'email' ? this.loginData.email = e.target.value :
      this.loginData.password = e.target.value 
    }
 
    loginRequest = (e) => {
        e.preventDefault();
        axios.post('/users/login/', this.loginData)
          .then((response)=> {
            if (response.status === 200) {   
                const { name , id , email , image , token } = response.data;
                // localStorage.name = response.data.name;
                // localStorage.id = response.data.id;
                // localStorage.email = response.data.email;
                // localStorage.image =response.data.image;
                // localStorage.token =response.data.token;
                const user = { name , id  ,email ,image ,token };
                localStorage.setItem("user",JSON.stringify(user))
                localStorage.guest = false;
            //    this.setState({ user: localStorage });
               this.props.history.push("/Forum");
               this.props.loginHandler(true)
            }else{
                this.setState({validationFlag:true})      
            }
          })
          .catch((error)=> {
            this.setState({validationFlag:true})      
            console.log(error);
          });
          
    }
    render() {    
        return (
            <div className='Login'>
                    {this.state.validationFlag ?
                   <Alert variant='warning' onClick={()=>this.setState({validationFlag:false})}>  
                        Please try again. 
                        <p>Make sure user Email and Password are correct</p>
                        <p>
                            <Alert.Link >Click here to close this window</Alert.Link>
                        </p>
                    </Alert> : ''} 
                <h2>Login</h2>
                <Form onSubmit={(e)=>this.loginRequest(e)} className="Login_form">
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                        Email
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type="email" onChange={(e)=>this.getInputsData(e,'email')} placeholder="Email" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                        Password
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type="password" onChange={(e)=>this.getInputsData(e,'password')} placeholder="Password" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col sm={{span: 10, offset: 2 }}>
                        <Button className='buttons' type="submit" >Login</Button>
                        <Button className='buttons' name="login" href="/">Return</Button>
                        </Col>
                    </Form.Group>
                    </Form>
            </div>
        );
    }
}

export default Login;