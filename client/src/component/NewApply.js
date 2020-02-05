import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './NewApply.css'


export default class NewApply extends Component {

    newApply = {
        date: '',
        company: '',
        product: '',
        location: '',
        status: '',
        cvversion: '',
        tech: '',
        isAnswered: false
    }

    render() {
        return (
            <div className="NewApply">
                <Container>
                    <h1>New Job Apply</h1>
                    <Form onSubmit={(e) => this.submitData(e)}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridText">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control onChange={(e) => this.getInputsData(e)} name="company" type="text" required placeholder="Company Name" />
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridText">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control onChange={(e) => this.getInputsData(e)} name="date" type="date" required />
                                </Form.Group>
                            </Form.Row>
                        </Form.Row>

                        <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Company</Form.Label>
                                <Form.Control as="select" onChange={(e) => this.getInputsData(e)} name="isAnswered" >
                                    <option>Startup</option>
                                    <option>Big Company</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Technology</Form.Label>
                                <Form.Control onChange={(e) => this.getInputsData(e)} name="tech" type="text" placeholder="Technology" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Cv Version</Form.Label>
                                <Form.Control onChange={(e) => this.getInputsData(e)} name="cvversion" type="text" placeholder="FullStack Version / Front-End Version" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control onChange={(e) => this.getInputsData(e)} name="location" placeholder="Dizingof 12 Tel Aviv" />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Status</Form.Label>
                                <Form.Control as="select" onChange={(e) => this.getInputsData(e)} name="status">
                                    <option>Phone interview</option>
                                    <option>HR interview</option>
                                    <option>Technical interview</option>
                                    <option>Assignment</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Answerd</Form.Label>
                                <Form.Control as="select" onChange={(e) => this.getInputsData(e)} name="isAnswered" >
                                    <option defaultValue>No</option>
                                    <option>Yes</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Button variant="primary" type="submit">SAVE</Button>
                    </Form>
                </Container>
            </div>
        )
    }
    getInputsData = (e) => {
        if (e.target.name === 'company') return this.newApply.company = e.target.value;
        if (e.target.name === 'date') return this.newApply.date = e.target.value;
        if (e.target.name === 'product') return this.newApply.product = e.target.value;
        if (e.target.name === 'location') return this.newApply.location = e.target.value;
        if (e.target.name === 'status') return this.newApply.status = e.target.value;
        if (e.target.name === 'cvversion') return this.newApply.cvversion = e.target.value;
        if (e.target.name === 'tech') return this.newApply.tech = e.target.value;
        if (e.target.name === 'isAnswered') return this.newApply.isAnswered = e.target.value === 'Yes' ? true : false;
    }

    submitData = (e) => {
        e.preventDefault();
    
        axios.post('/jobapply', this.newApply)
            .then((response) => {
                // console.log(response.data,'resdata');
                if (response.status === 201) {                     
                    this.props.newApplyAdded(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

}
