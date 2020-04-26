import React from 'react';
import { useFormik } from 'formik';
import { Form, Col, Container, Button } from 'react-bootstrap';
import axios from "axios";
import './ApplyForm.css';


const ApplyForm = (props) => {

    const { title, initialValues, axiosInfo, CssClass, closeMe } = props;

    const formik = useFormik({
        initialValues,
        onSubmit: values => {
            console.log("form value", values);

            submitForm(values);

        },
    });

    const submitForm = (data) => {
        const { method, url, headers, resolveFunction } = axiosInfo;

        axios({ method, url, data, headers })
            .then(response => {
                if (response.status === 200 || response.status === 201) {
                    console.log("response.data",response.data);
                    
                    resolveFunction(response.data);
                };
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div className={CssClass}>
            <Container>
                <Form.Row>
                    <h1>{title} Job Apply</h1>
                    <button style={{ right: "5px", position: "absolute" }} onClick={closeMe}>X</button>
                </Form.Row>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control
                                id="company"
                                name="company"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.company}
                                required
                                placeholder="Company Name"
                            />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    id="date"
                                    name="date"
                                    type="date"
                                    onChange={formik.handleChange}
                                    value={formik.values.date}
                                    required
                                />
                            </Form.Group>
                        </Form.Row>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Company size</Form.Label>
                            <Form.Control
                                as="select"
                                id="companySize"
                                name="companySize"
                                value={formik.values.companySize}
                                onChange={formik.handleChange}
                                required
                            >
                                <option disabled value="Choose">Choose</option>
                                <option>Startup</option>
                                <option>Big Company</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Job Description</Form.Label>
                            <Form.Control
                                id="jobDescription"
                                name="jobDescription"
                                type="text"
                                value={formik.values.jobDescription}
                                onChange={formik.handleChange}
                                placeholder="Job Description"
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>CV Version</Form.Label>
                            <Form.Control
                                id="cvversion"
                                name="cvversion"
                                type="text"
                                value={formik.values.cvversion}
                                onChange={formik.handleChange}
                                placeholder="FullStack Version / Front-End Version" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            id="location"
                            name="location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            placeholder="Dizingof 12 Tel Aviv" />
                    </Form.Group>

                    <Form.Row>

                        <Form.Group as={Col}>
                            <Form.Label>Answerd</Form.Label>
                            <Form.Control
                                as="select"
                                id="isAnswered"
                                name="isAnswered"
                                value={formik.values.isAnswered}
                                onChange={formik.handleChange}
                            >
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                id="status.current"
                                name="status.current"
                                value={formik.values.status.current}
                                onChange={formik.handleChange}
                            >
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
                                <input
                                    id={`status.${formik.values.status.current}.contactName`}
                                    name={`status.${formik.values.status.current}.contactName`}
                                    value={formik.values.status[formik.values.status.current].contactName}
                                    onChange={formik.handleChange}
                                    placeholder="Name"
                                >
                                </input>
                                <br />
                                <input
                                    id={`status.${formik.values.status.current}.contactPhone`}
                                    name={`status.${formik.values.status.current}.contactPhone`}
                                    value={formik.values.status[formik.values.status.current].contactPhone}
                                    onChange={formik.handleChange}
                                    placeholder="Phone"
                                >
                                </input>
                                <br />
                                <input
                                    id={`status.${formik.values.status.current}.contactPosition`}
                                    name={`status.${formik.values.status.current}.contactPosition`}
                                    value={formik.values.status[formik.values.status.current].contactPosition}
                                    onChange={formik.handleChange}
                                    placeholder="Position"
                                >
                                </input>
                            </div>
                            <div style={{ float: "right" }}>
                                <textarea
                                    id={`status.${formik.values.status.current}.statusDescription`}
                                    name={`status.${formik.values.status.current}.statusDescription`}
                                    value={formik.values.status[formik.values.status.current].statusDescription}
                                    onChange={formik.handleChange}
                                    placeholder="How did it go?"
                                >
                                </textarea>
                            </div>
                        </div>
                    </Form.Row>
                    <Button variant="primary" type="submit">SAVE</Button>
                </Form>
            </Container>
        </div>
    )
};
export default ApplyForm;
