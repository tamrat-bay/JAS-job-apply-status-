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
        cvversion: '',
        tech: '',
        isAnswered: false,
        status: {
            "current": {},
            "Pending": {},
            "Phone interview": {},
            "HR interview": {},
            "Technical interview": {},
            "Assignment": {}
        },
    }

    statusDeatiles = {
        contactName: '',
        contactPhone: '',
        contactPosition: '',
        statusDescription: ''
    }


    render() {
        return (
            <div className="NewApply">
                <Container>
                    <Form.Row className="">
                        <h1>New Job Apply</h1>
                        <button style={{ right: "5px", position: "absolute" }} onClick={this.props.closeMe}>X</button>
                    </Form.Row>
                    <Form onSubmit={(e) => this.submitData(e)}>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control onChange={(e) => this.getInputsData(e)} name="company" type="text" required placeholder="Company Name" />
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control onChange={(e) => this.getInputsData(e)} name="date" type="date" required />
                                </Form.Group>
                            </Form.Row>
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
                                <Form.Control onChange={(e) => this.getInputsData(e)} name="tech" type="text" placeholder="Technology" />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Cv Version</Form.Label>
                                <Form.Control onChange={(e) => this.getInputsData(e)} name="cvversion" type="text" placeholder="FullStack Version / Front-End Version" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control onChange={(e) => this.getInputsData(e)} name="location" placeholder="Dizingof 12 Tel Aviv" />
                        </Form.Group>

                        <Form.Row>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Answerd</Form.Label>
                                <Form.Control defaultValue={false} as="select" onChange={(e) => this.getInputsData(e)} name="isAnswered" >
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        {/*  */}
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Status</Form.Label>
                                <Form.Control as="select" onChange={(e) => this.getInputsData(e)} name="status">
                                    <option defaultValue>Pending</option>
                                    <option>Phone interview</option>
                                    <option>HR interview</option>
                                    <option>Technical interview</option>
                                    <option>Assignment</option>
                                </Form.Control>
                            </Form.Group>
                            <div style={{ border: "1px solid", padding: "5px" }}>
                                <h1>status details</h1>
                                <div style={{ float: "left" }}>
                                    <input onChange={(e) => this.getInputsData(e)} name="contactName" placeholder="Name"></input>
                                    <br />
                                    <input onChange={(e) => this.getInputsData(e)} name="contactPhone" placeholder="Phone"></input>
                                    <br />
                                    <input onChange={(e) => this.getInputsData(e)} name="contactPosition" placeholder="Position"></input>
                                </div>
                                <div style={{ float: "right" }}>
                                    <textarea onChange={(e) => this.getInputsData(e)} name="statusDescription" placeholder="How did it go?"></textarea>
                                </div>
                            </div>
                        </Form.Row>
                        {/*  */}
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
        if (e.target.name === 'status') return this.newApply.status.current = e.target.value;
        if (e.target.name === 'cvversion') return this.newApply.cvversion = e.target.value;
        if (e.target.name === 'tech') return this.newApply.tech = e.target.value;
        if (e.target.name === 'isAnswered') return this.newApply.isAnswered = e.target.value;
        //status inputs
        if (e.target.name === 'contactName') return this.statusDeatiles.contactName = e.target.value;
        if (e.target.name === 'contactPhone') return this.statusDeatiles.contactPhone = e.target.value;
        if (e.target.name === 'contactPosition') return this.statusDeatiles.contactPosition = e.target.value;
        if (e.target.name === 'statusDescription') return this.statusDeatiles.statusDescription = e.target.value;
        //status inputs


    }

    submitData = (e) => {
        e.preventDefault();
        // this.newApply.isAnswered === 'Yes' ?
        //     this.newApply.isAnswered = true :
        //     this.newApply.isAnswered = false;
        console.log(this.newApply);

        // axios.post('/jobapply', this.newApply)
        //     .then((response) => {
        //         // console.log(response.data,'resdata');
        //         if (response.status === 201) {
        //             this.props.newApplyAdded(response.data);
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }

}
