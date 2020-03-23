import React from 'react'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './NewApply.css'



function NewApply(props) {
    let newApply = {
        date: '',
        company: '',
        companySize: '',
        location: '',
        cvversion: '',
        jobDescription: '',
        isAnswered: false,
        status: {
            current: 'Pending',//! default value
            Pending: '',
            Assignment: '',
            "HR interview": '',
            "Phone interview": '',
            "Technical interview": ''
        },
    }

  let  statusDeatiles = {
        contactName: '',
        contactPhone: '',
        contactPosition: '',
        statusDescription: ''
    }

   const getInputsData = (e) => {

        if (e.target.parentElement.parentElement.className === "statusDetails") {
            statusDeatiles[e.target.name] = e.target.value;

        } else if (e.target.name === "status") {
            newApply[e.target.name].current = e.target.value;
        } else {
            newApply[e.target.name] = e.target.value;
        }


    }

    const  submitData = (e) => {

        e.preventDefault();
        newApply.status[newApply.status.current] = { ...statusDeatiles }
        console.log(newApply);


            axios.post('/jobapply', newApply)
                .then((response) => {
                    if (response.status === 201) {                     
                        props.newApplyAdded(response.data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
    }
    return (
        <div className="NewApply">
        <Container>
            <Form.Row className="">
                <h1>New Job Apply</h1>
                <button style={{ right: "5px", position: "absolute" }} onClick={props.closeMe}>X</button>
            </Form.Row>
            <Form onSubmit={(e) => submitData(e)}>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control onChange={(e) => getInputsData(e)} name="company" type="text" required placeholder="Company Name" />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Date</Form.Label>
                            <Form.Control onChange={(e) => getInputsData(e)} name="date" type="date" required />
                        </Form.Group>
                    </Form.Row>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Company</Form.Label>
                        <Form.Control as="select" defaultValue="Choose" onChange={(e) => getInputsData(e)} required name="companySize" >
                            <option disabled value="Choose" >Choose</option>
                            <option>Startup</option>
                            <option>Big Company</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Job Description</Form.Label>
                        <Form.Control onChange={(e) => getInputsData(e)} name="jobDescription" type="text" placeholder="jobDescription" />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Cv Version</Form.Label>
                        <Form.Control onChange={(e) => getInputsData(e)} name="cvversion" type="text" placeholder="FullStack Version / Front-End Version" />
                    </Form.Group>
                </Form.Row>

                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control onChange={(e) => getInputsData(e)} name="location" placeholder="Dizingof 12 Tel Aviv" />
                </Form.Group>

                <Form.Row>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Answerd</Form.Label>
                        <Form.Control defaultValue={false} as="select" onChange={(e) => getInputsData(e)} name="isAnswered" >
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                {/*  */}
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select" onChange={(e) => getInputsData(e)} name="status">
                            <option defaultValue>Pending</option>
                            <option>Phone interview</option>
                            <option>HR interview</option>
                            <option>Technical interview</option>
                            <option>Assignment</option>
                        </Form.Control>
                    </Form.Group>
                    <div className="statusDetails" style={{ border: "1px solid", padding: "5px" }}>
                        <h1>status details</h1>
                        <div style={{ float: "left" }}>
                            <input onChange={(e) => getInputsData(e)} name="contactName" placeholder="Name"></input>
                            <br />
                            <input onChange={(e) => getInputsData(e)} name="contactPhone" placeholder="Phone"></input>
                            <br />
                            <input onChange={(e) => getInputsData(e)} name="contactPosition" placeholder="Position"></input>
                        </div>
                        <div style={{ float: "right" }}>
                            <textarea onChange={(e) => getInputsData(e)} name="statusDescription" placeholder="How did it go?"></textarea>
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

export default NewApply
