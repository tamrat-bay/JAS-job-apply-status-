import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './UpdateApply.css'



export default class UpdateApply extends Component {

    state = { updateApply: { ...this.props.data } };

    render() {

        const { updateApply: data } = this.state;

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
                                <Form.Control onChange={(e) => this.getInputsData(e)} value={data.company}
                                    name="company" type="text" required placeholder="Company Name" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Company</Form.Label>
                                <Form.Control as="select" onChange={(e) => this.getInputsData(e)} value={data.companySize} name="companySize" >
                                    <option>Startup</option>
                                    <option>Big Company</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Job Description</Form.Label>
                                <Form.Control onChange={(e) => this.getInputsData(e)} value={data.jobDescription}
                                    name="jobDescription" type="text" placeholder="jobDescription" />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Cv Version</Form.Label>
                                <Form.Control onChange={(e) => this.getInputsData(e)} value={data.cvversion}
                                    name="cvversion" type="text" placeholder="FullStack Version / Front-End Version" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control onChange={(e) => this.getInputsData(e)} value={data.location}
                                name="location" placeholder="Dizingof 12 Tel Aviv" />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Answerd</Form.Label>
                                <Form.Control value={data.isAnswered} as="select" onChange={(e) => this.getInputsData(e)} name="isAnswered" >
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        {/*  */}
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Status</Form.Label>
                                <Form.Control as="select" onChange={(e) => this.getInputsData(e)} defaultValue={data.status.current} name="status">
                                    <option>Pending</option>
                                    <option>Phone interview</option>
                                    <option>HR interview</option>
                                    <option>Technical interview</option>
                                    <option>Assignment</option>
                                </Form.Control>
                            </Form.Group>
                            <div className="statusDetails" style={{ border: "1px solid", padding: "5px" }}>
                                <h1>status details</h1>
                                <div style={{ float: "left" }}>
                                    <input onChange={(e) => this.getInputsData(e)} value={data.status[data.status.current].contactName} name="contactName" placeholder="Name"></input>
                                    <br />
                                    <input onChange={(e) => this.getInputsData(e)} value={data.status[data.status.current].contactPhone} name="contactPhone" placeholder="Phone"></input>
                                    <br />
                                    <input onChange={(e) => this.getInputsData(e)} value={data.status[data.status.current].contactPosition} name="contactPosition" placeholder="Position"></input>
                                </div>
                                <div style={{ float: "right" }}>
                                    <textarea onChange={(e) => this.getInputsData(e)} value={data.status[data.status.current].statusDescription} name="statusDescription" placeholder="How did it go?"></textarea>
                                </div>
                            </div>
                        </Form.Row>
                        {/*  */}
                        <Button variant="primary" type="submit">Add</Button>
                    </Form>
                </Container>
            </div>
        )
    };

    getInputsData = (e) => {

        if (e.target.parentElement.parentElement.className === "statusDetails") {
            const tmpObj = { ...this.state.updateApply };
            tmpObj.status[this.state.updateApply.status.current][e.target.name] = e.target.value;
            this.setState({ updateApply: { ...tmpObj } });


        } else if (e.target.name === "status") {
            const tmpObj = { ...this.state.updateApply };
            tmpObj.status.current = e.target.value;
            this.setState({ updateApply: { ...tmpObj } });

        } else {
            const tmpObj = { ...this.state.updateApply };
            tmpObj[e.target.name] = e.target.value;
            this.setState({ updateApply: { ...tmpObj } });
        }
    };

    submitData = (e) => {
        e.preventDefault();

        const { _id, index } = this.props.data;
        const { token } = JSON.parse(localStorage.jas_login);

        axios({
            method: 'put',
            data: this.state.updateApply,
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
    };
};
