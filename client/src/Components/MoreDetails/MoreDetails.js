import React, { Component } from 'react';
import './MoreDetails.css';
import Table from 'react-bootstrap/Table'

export default class MoreDetails extends Component {
    render() {
        //? All the apply data is here 
        console.log(this.props.data);
        const {data} = this.props;
        return (
            <div className="MoreDetails" >
                 <h4 onClick = {this.props.close}>Close Window</h4>
                <h2>{data.company}</h2>
                <h3>Is a {data.companySize} in {data.location}</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Date</th>
                        <th>Cv Version</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{data.date}</td>
                        <td>{data.cvversion}</td>
                        <td>{data.status.current}</td> 
                        </tr>
                    </tbody>
                    </Table>
                    <div className="MoreDetails_description">
                     <h4>Job Description</h4>
                     <p>{data.jobDescription}</p>

                     {data.isAnswered ? <div>
                         <h4>Contact Name: {data.status[data.status.current].contactName}</h4>
                          <h5> Phone: {data.status[data.status.current].contactPhone}</h5>
                          <h5>Position : {data.status[data.status.current].contactPosition}</h5>
                        <p>
                        {data.status[data.status.current].statusDescription}
                        </p>

                           </div>: ''}
                    </div>
            </div>
        )
    }
}
