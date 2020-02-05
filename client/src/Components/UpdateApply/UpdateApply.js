import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './UpdateApply.css'



export default class UpdateApply extends Component {

    UpdateApply = {
        date: this.props.data.date,
        company: this.props.data.company,
        product: this.props.data.product,
        location: this.props.data.location,
        status: this.props.data.status,
        cvversion: this.props.data.cvversion,
        tech: this.props.data.tech,
        isAnswered: false
    }

    render() {
        const { data } = this.props;

        return (
            <div className="UpdateApply">
                <Container>
                    <Form.Row className="">
                        <h1>Update Apply</h1>
                        <button style={{ right: "5px", position: "absolute" }} onClick={this.props.closeMe}>X</button>
                    </Form.Row>
                    <Form onSubmit={(e) => this.submitData(e)}>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control onChange={(e) => this.getInputsData(e)} defaultValue={data.company}
                                    name="company" type="text" required placeholder="Company Name" />
                            </Form.Group>


                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Company</Form.Label>
                                <Form.Control as="select" onChange={(e) => this.getInputsData(e)} name="isAnswered" >
                                    <option>Startup</option>
                                    <option>Big Company</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Technology</Form.Label>
                                <Form.Control onChange={(e) => this.getInputsData(e)} defaultValue={data.tech}
                                    name="tech" type="text" placeholder="Technology" />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Cv Version</Form.Label>
                                <Form.Control onChange={(e) => this.getInputsData(e)} defaultValue={data.cvversion}
                                    name="cvversion" type="text" placeholder="FullStack Version / Front-End Version" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control onChange={(e) => this.getInputsData(e)} defaultValue={data.location}
                                name="location" placeholder="Dizingof 12 Tel Aviv" />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Status</Form.Label>
                                <Form.Control as="select" onChange={(e) => this.getInputsData(e)} name="status">
                                    <option>Phone interview</option>
                                    <option>HR interview</option>
                                    <option>Technical interview</option>
                                    <option>Assignment</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Answerd</Form.Label>
                                <Form.Control onChange={(e) => this.getInputsData(e)} name="isAnswered" as="select">
                                    <option defaultValue>No</option>
                                    <option>Yes</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Button variant="primary" type="submit">Add</Button>
                    </Form>
                </Container>
            </div>
        )
    }

    getInputsData = (e) => {
        if (e.target.name === 'company') return this.UpdateApply.company = e.target.value;
        if (e.target.name === 'product') return this.UpdateApply.product = e.target.value;
        if (e.target.name === 'location') return this.UpdateApply.location = e.target.value;
        if (e.target.name === 'status') return this.UpdateApply.status = e.target.value;
        if (e.target.name === 'cvversion') return this.UpdateApply.cvversion = e.target.value;
        if (e.target.name === 'tech') return this.UpdateApply.tech = e.target.value;
        if (e.target.name === 'isAnswered') return this.UpdateApply.isAnswered = e.target.value === 'Yes' ? true : false;
    }

    submitData = (e) => {
        e.preventDefault();
        console.log(this.UpdateApply);
        const id = this.props.data.id;
        console.log(id, 'this is uodate id');

        const index = this.props.data.index;
        axios.put(`/jobapply/${id}`, this.UpdateApply)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response);
                    this.props.updateApply(this.UpdateApply, index);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }


}
