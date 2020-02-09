import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import axios from 'axios';
import NewApply from '../NewApply/NewApply';
import UpdateApply from '../UpdateApply/UpdateApply';
import MoreDetails from '../MoreDetails/MoreDetails';
import './ApplyTable.css'
import SearchBar from '../SearchBar/SearchBar';


export default class ApplyTable extends Component {

    state = {

        jobApplies: [{status:{}}],
        addNewFlag: false,
        updateFlag: false,
        deleteFlag: false,
        moreDetailsFlag: false
    }

    singleApplyData = {}


    render() {
        console.log(this.state.jobApplies);
        
        return (
            <div className="ApplyTable">

                {this.state.moreDetailsFlag ? <MoreDetails data={this.singleApplyData}
                    close={() => this.setState({ moreDetailsFlag: false })} /> : ''}
                <div style={{ height: "20px", margin: "15px" }}>
                    {!this.state.addNewFlag && !this.state.updateFlag ?
                        <button onClick={() => this.setState({ addNewFlag: true })}>Add New Apply</button> : ""}
                </div>
                {
                    this.state.addNewFlag ?
                        <NewApply newApplyAdded={this.newApplyAdded}
                            closeMe={this.closeAddNewApplyPopup} />
                        : ''
                }
                {this.state.updateFlag ? <UpdateApply data={this.singleApplyData} updateApply={this.updateApply} closeMe={this.closeUpdateApplyPopup} /> : ''}
                {this.state.deleteFlag ? <div className="ApplyTable_delete">
                    <h2>Are you sure you want to delete</h2>
                    <h4>{this.singleApplyData.company}</h4>
                    <div><button onClick={() => this.deleteApply()}>YES</button></div>
                    <div><button onClick={() => this.setState({ deleteFlag: false })}>No</button></div>
                </div> : ''}

                 <SearchBar applies={this.state.jobApplies}/>

                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Company</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Update / Delete</th>
                            <th>More Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.jobApplies.map((j, i) =>
                        
                            <tr key={i} >
                                <td>{j.date}</td>
                                <td>{j.company}</td>
                                <td>{j.location}</td>
                                <td>{j.status.current}</td>
                                    <td> <span onClick={()=>{this.singleApplyData = {...j};                                    
                                        this.singleApplyData.index = i;
                                        this.setState({updateFlag:!this.state.updateFlag})}}>
                                        <span role="img" aria-label="handwrite">✍</span>Update</span>

                                    | <span onClick={()=> {this.setState({deleteFlag:!this.state.deleteFlag});
                                        this.singleApplyData = {company:j.company, id:j._id, index:i};
                                    } }>
                                        <span role="img" aria-label="sciccors">✂</span> Delete</span>
                                </td>

                                <td onClick={() => { this.getMoreDetails(j) }} >More Details</td>

                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        )
    }

    closeAddNewApplyPopup = () => {
        this.setState({ addNewFlag: false })
    }

    closeUpdateApplyPopup = () => {
        this.setState({ updateFlag: false })
    }

    newApplyAdded = (data) => {
        const temp = this.state.jobApplies;
        temp.push(data);
        this.setState({ jobApplies: temp, addNewFlag: false })
    }

    updateApply = (data, i) => {
        let temp = [...this.state.jobApplies];
        temp[i] = { ...data };
        this.setState({ jobApplies: temp, updateFlag: false })
    }

    deleteApply = () => {
        const { id, index } = this.singleApplyData;

        axios.delete(`/jobapply/${id}`, {
        })
            .then(res => {
                if (res.status === 200) {
                    const temp = this.state.jobApplies;
                    temp.splice(index, 1)
                    this.setState({ jobApplies: temp, deleteFlag: false })
                }
            })
            .catch(err => console.log(err))
    }


    getMoreDetails = (singleAppyObj) => {
        this.setState({ moreDetailsFlag: true });
        this.singleApplyData = singleAppyObj;
    }

    componentDidMount() {

        axios.get('/jobapply')
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data, 'data from server');
                    
                    this.setState({ jobApplies: res.data })
                }
            })
            .catch(error =>
                console.log(error)
            );
    }

}