import React, { useState } from 'react';
import { Form, Col } from 'react-bootstrap';
import './MoreDetails.css';

const MoreDetails = (props) => {

    const { data, close } = props;

    console.log("MoreDetails DATA:", data);

    const [currentStatus, setCurrentStatus] = useState(data.status.current);

    const handleChange = e => setCurrentStatus(e.target.value);

    return (
        <div className='MoreDetails' >
            <div className='MoreDetails-close'>
                <i className='fas fa-times' onClick={close}></i>
            </div>

            <div className='MoreDetails-items'>
                <ul>
                    <li>
                        <strong>CV version: </strong>
                        <span>{data.cvversion}.</span>
                    </li>
                    <li>
                        <strong>Company location: </strong>
                        <span>{data.location}.</span>
                    </li>
                    <li>
                        <strong>Company size: </strong>
                        <span>{data.companySize}.</span>
                        
                    </li>
                    <li>
                        <strong>Job description: </strong>
                        <span>{data.jobDescription}.</span>
                    </li>
                    <li>
                        <strong>Answered: </strong>
                        <span>{data.isAnswered ? "Yes" : "No"}.</span>
                    </li>
                </ul>
            </div>

            <div className='MoreDetails-statusDetailes'>

                <fieldset>
                    
                    <legend>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Control
                                    as="select"
                                    id="status.current"
                                    name="status.current"
                                    value={currentStatus}
                                    onChange={handleChange}
                                >
                                    <option>Pending</option>
                                    <option>Phone interview</option>
                                    <option>HR interview</option>
                                    <option>Technical interview</option>
                                    <option>Assignment</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                    </legend>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <div className="statusDetails">
                                <div>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Contact Name</Form.Label>
                                            <Form.Control
                                                value={data.status[currentStatus].contactName}
                                                readOnly
                                                placeholder="Name"
                                            >
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label>Contact Phone</Form.Label>
                                            <Form.Control
                                                value={data.status[currentStatus].contactPhone}
                                                readOnly
                                                placeholder="Phone"
                                            >
                                            </Form.Control>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Contact Position</Form.Label>
                                            <Form.Control
                                                value={data.status[currentStatus].contactPosition}
                                                readOnly
                                                placeholder="Position"
                                            >
                                            </Form.Control>
                                        </Form.Group>
                                    </Form.Row>
                                </div>
                                <div>
                                    <Form.Label>How did it went</Form.Label>
                                    <Form.Control as='textarea'
                                        value={data.status[currentStatus].statusDescription}
                                        readOnly
                                        placeholder="How did it go?"
                                    >
                                    </Form.Control>
                                </div>
                            </div>
                        </Form.Group>
                    </Form.Row>
                </fieldset>


            </div>
        </div>

    )
};
export default MoreDetails;


