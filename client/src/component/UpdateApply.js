import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './UpdateApply.css'



export default class UpdateApply extends Component {
    UpdateApply = {
        date:this.props.data.date,
        company:this.props.data.company,
        product:this.props.data.product,
        location:this.props.data.location,
        status:this.props.data.status,
        cvversion:this.props.data.cvversion,
        tech:this.props.data.tech,
        isAnswered:false
    }

      getInputsData = (e)=>{
        if(e.target.name === 'company') return this.UpdateApply.company = e.target.value;
        if(e.target.name === 'date') return this.UpdateApply.date = e.target.value;
        if(e.target.name === 'product') return this.UpdateApply.product = e.target.value ;
        if(e.target.name === 'location') return this.UpdateApply.location = e.target.value;
        if(e.target.name === 'status') return this.UpdateApply.status = e.target.value ;
        if(e.target.name === 'cvversion') return this.UpdateApply.cvversion = e.target.value ;
        if(e.target.name === 'tech') return this.UpdateApply.tech = e.target.value ;
        if(e.target.name === 'isAnswered') return this.UpdateApply.isAnswered = e.target.value === 'Yes' ? true : false;
      }
      submitData = (e)=>{
        e.preventDefault();
            console.log(this.UpdateApply);
        const id = this.props.data.id;
        const index = this.props.data.index;
        axios.put(`/jobapply/${id}`, this.UpdateApply)
        .then((response)=> {
            if (response.status === 200) {   
                console.log(response);
                this.props.updateApply(this.UpdateApply,index);
            }
            })
            .catch((error)=> {
            console.log(error);
            });
        }      
      
    render() {
        const {data} = this.props; 
     
        return (
            <div className="UpdateApply"> 
         <Container>
             <h1>UPDATE APPLY</h1>
         <Form onSubmit={(e)=>this.submitData(e)}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridText">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control onChange={(e)=>this.getInputsData(e)} defaultValue={data.company}
                     name="company" type="text" required placeholder="Company Name" />
                    </Form.Group>

                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridText">
                    <Form.Label>Date</Form.Label>
                    <Form.Control onChange={(e)=>this.getInputsData(e)} defaultValue={data.date}
                     name="date" type="date" required />
                   </Form.Group>
                 </Form.Row>
                </Form.Row>

                <Form.Row>                 
                   <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Product</Form.Label>
                    <Form.Control onChange={(e)=>this.getInputsData(e)} defaultValue={data.product}
                    name="product" type="text" placeholder="Product" />
                    </Form.Group> 
                </Form.Row>

                <Form.Row>                 
                   <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Technology</Form.Label>
                    <Form.Control onChange={(e)=>this.getInputsData(e)} defaultValue={data.tech}
                     name="tech" type="text" placeholder="Technology" />
                    </Form.Group> 

                    <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Cv Version</Form.Label>
                    <Form.Control onChange={(e)=>this.getInputsData(e)} defaultValue={data.cvversion}
                    name="cvversion" type="text" placeholder="FullStack Version / Front-End Version" />
                    </Form.Group> 
                </Form.Row>

                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control onChange={(e)=>this.getInputsData(e)} defaultValue={data.location}
                    name="location" placeholder="Dizingof 12 Tel Aviv" />
                </Form.Group>

                <Form.Row>                 
                   <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Status</Form.Label>
                    <Form.Control  onChange={(e)=>this.getInputsData(e)} defaultValue={data.status}
                    name="status" type="text" placeholder="Pending / Called / Waiting for Interview" />
                    </Form.Group> 

                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Answerd</Form.Label>
                        <Form.Control onChange={(e)=>this.getInputsData(e)} name="isAnswered" as="select">
                            <option defaultValue>No</option>
                            <option>Yes</option>
                        </Form.Control>
                     </Form.Group> 
                </Form.Row>
                <Button variant="primary" type="submit">
                    Add
                </Button>
            </Form>
            </Container>
            </div>
        )
    }
}
