import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import NewApply from './NewApply';

export default class ApplyTable extends Component {
    state={jobApplies:[] ,addNew:false}

    newApplyAdded = (data)=>{
        const temp = this.state.jobApplies;
        temp.push(data);
        this.setState({jobApplies:temp})
    }
    render() {
        return (
            <div className="ApplyTable">
                <button onClick={()=>this.setState({addNew:!this.state.addNew})}>
                   {!this.state.addNew ?'Add New Apply ' : 'Close Window'} 
                </button>
                {this.state.addNew ? <NewApply newApplyAdded={this.newApplyAdded} /> : ''}
              
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
                     {this.state.jobApplies.map((j,i)=> 
                     <tr key={i} onClick={()=>console.log(j._id)}>
                        <td>{j.date}</td>
                        <td>{j.company}</td>
                        <td>{j.location}</td>
                        <td>{j.product}</td>
                        <td>{j.status}</td>
                        <td>{j.cvversion}</td>
                        <td>{j.tech}</td>
                        <td>{j.isAnswered ? 'YES' : 'NO'}</td>
                        <td><span>✍Update</span> | <span> ✂ Delete</span></td>
                     </tr>
                     )}
                    </tbody>
                 </Table>
            </div>
        )
    }
    componentDidMount(){
        fetch('/jobapply')
        .then((response) => {
          return response.json()
          .then(jobApplies => {console.log(jobApplies); this.setState({jobApplies})})
          .catch(err=>console.log(err));
        })
        .then((myJson) => {
          console.log(myJson);
        });
    }
}
