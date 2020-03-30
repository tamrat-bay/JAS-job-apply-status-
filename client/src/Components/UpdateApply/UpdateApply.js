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
        companySize: this.props.data.companySize,
        location: this.props.data.location,
        status: { current: this.props.data.status },
        cvversion: this.props.data.cvversion,
        jobDescription: this.props.data.jobDescription,
        isAnswered: this.props.data.isAnswered
    }

    render() {
        console.log(this.props);

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
                                <Form.Control as="select" onChange={(e) => this.getInputsData(e)} name="companySize" >
                                    <option>Startup</option>
                                    <option>Big Company</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Job Description</Form.Label>
                                <Form.Control onChange={(e) => this.getInputsData(e)} defaultValue={data.jobDescription}
                                    name="jobDescription" type="text" placeholder="jobDescription" />
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
                                    <option>Pending</option>
                                    <option>Phone interview</option>
                                    <option>HR interview</option>
                                    <option>Technical interview</option>
                                    <option>Assignment</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Answerd</Form.Label>
                                <Form.Control onChange={(e) => this.getInputsData(e)} name="isAnswered" as="select">
                                    <option defaultValue>{this.props.data.isAnswered ? 'Yes' : 'No'}</option>
                                    <option>{this.props.data.isAnswered ? 'No' : 'Yes'}</option>
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
        this.UpdateApply[e.target.name] = e.target.value;
    }

    submitData = (e) => {
        e.preventDefault();
        this.UpdateApply.isAnswered === 'Yes' ?
            this.UpdateApply.isAnswered = true :
            this.UpdateApply.isAnswered = false;

        console.log(this.UpdateApply);


        const { _id, index } = this.props.data;
        const { token } = JSON.parse(localStorage.jas_login);

        axios({
            method: 'put',
            data: this.UpdateApply,
            url: `/jobapply/${_id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    this.props.updateApply(response.data, index);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }


}
