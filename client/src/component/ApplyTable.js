import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import NewApply from './NewApply';
import './ApplyTable.css'
import UpdateApply from './UpdateApply';
import axios from 'axios';

export default class ApplyTable extends Component {
    state = { jobApplies: [], addNew: false, update: false, delete: false }

    newApplyAdded = (data) => {
        const temp = this.state.jobApplies;
        temp.push(data);
        this.setState({ jobApplies: temp, addNew: false })
    }
    updateApply = (data, i) => {
        let temp = [...this.state.jobApplies];
        temp[i] = data;
        this.setState({ jobApplies: temp, update: false })
    }
    deleteApply = () => {
        const { id, index } = this.singleApplyData;

        axios.delete(`/jobapply/${id}`, {
        })
            .then(res => {
                if (res.status === 200) {
                    const temp = this.state.jobApplies;
                    temp.splice(index, 1)
                    this.setState({ jobApplies: temp, delete: false })
                }
            })
            .catch(err => console.log(err))
    }
    singleApplyData = {}
    render() {
        return (
            <div className="ApplyTable">
                <button onClick={() => this.setState({ addNew: !this.state.addNew })}>
                    {!this.state.addNew ? 'Add New Apply ' : 'Close Window'}
                </button>
                {this.state.addNew ? <NewApply newApplyAdded={this.newApplyAdded} /> : ''}
                {this.state.update ? <UpdateApply data={this.singleApplyData} updateApply={this.updateApply} /> : ''}
                {this.state.delete ? <div className="ApplyTable_delete">
                    <h2>Are you sure you want to delete</h2>
                    <h4>{this.singleApplyData.company}</h4>
                    <div><button onClick={() => this.deleteApply()}>YES</button></div>
                    <div><button onClick={() => this.setState({ delete: false })}>No</button></div>
                </div> : ''}

                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Company</th>
                            <th>Location</th>
                            <th>Product</th>
                            <th>Status</th>
                            <th>Cv Version</th>
                            <th>Technology</th>
                            <th>Answered ?</th>
                            <th>Update / Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.jobApplies.map((j, i) =>
                            <tr key={i} >
                                <td>{j.date}</td>
                                <td>{j.company}</td>
                                <td>{j.location}</td>
                                <td>{j.product}</td>
                                <td>{j.status}</td>
                                <td>{j.cvversion}</td>
                                <td>{j.tech}</td>
                                <td>{j.isAnswered ? 'YES' : 'NO'}</td>
                                <td> <span onClick={() => {
                                this.singleApplyData = this.state.jobApplies[i];
                                    this.singleApplyData.index = i;
                                    this.singleApplyData.id = j._id;
                                    this.setState({ update: !this.state.update })
                                }}>
                                    <span role="img" aria-label="handwrite">✍</span>Update</span>
                                    | <span onClick={() => {
                                        this.setState({ delete: !this.state.delete });
                                        this.singleApplyData = { company: j.company, id: j._id, index: i };
                                    }}>
                                        <span role="img" aria-label="sciccors">✂</span> Delete</span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        )
    }
    componentDidMount() {

        // axios.get('/jobapply')
        // .then(jobApplies=>{
        //     console.log(jobApplies); this.setState({jobApplies})
        // })
        // .catch( error =>
        //   console.log(error)
        // )

        fetch('/jobapply')
            .then((response) => {
                return response.json()
                    .then(jobApplies => { console.log(jobApplies); this.setState({ jobApplies }) })
                    .catch(err => console.log(err));
            })
            .then((myJson) => {
                console.log(myJson);
            });
    }
}
