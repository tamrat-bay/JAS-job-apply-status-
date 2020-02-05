import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import NewApply from './NewApply';
import './ApplyTable.css'
import UpdateApply from './UpdateApply';
import axios from 'axios';
import MoreDetails from './MoreDetails';

export default class ApplyTable extends Component {
    state={
        jobApplies:[{}],
        addNewFlag:false,
        updateFlag:false,
        deleteFlag:false,
        moreDetailsFlag:false
}

    singleApplyData = {}

    newApplyAdded = (data) => {
        const temp = [...this.state.jobApplies];
        temp.push(data);
        this.setState({jobApplies:temp,addNewFlag:false})
    }
    updateApply = (data, i) => {    
            
        let temp = [...this.state.jobApplies];        
        temp[i] = {...data};
        // console.log(temp[i]);
        
        this.setState({jobApplies:temp,updateFlag:false})
    }
    deleteApply = () => {
        const { id, index } = this.singleApplyData;

        axios.delete(`/jobapply/${id}`,{})
           .then(res=> {
               if (res.status === 200) {
                const temp = this.state.jobApplies;
                temp.splice(index,1)
                this.setState({jobApplies:temp,deleteFlag:false})
               }
           })
           .catch(err=>console.log(err))
    }
    render() {
        
        return (
            <div className="ApplyTable">
            
            {this.state.moreDetailsFlag ? <MoreDetails data={this.singleApplyData} 
            close = {()=>this.setState({moreDetailsFlag:false})} />  : ''}

                <button onClick={()=>this.setState({addNewFlag:!this.state.addNewFlag})}>
                   {!this.state.addNewFlag ?'Add New Apply ' : 'Close Window'} 
                </button>

                {this.state.addNewFlag ? <NewApply newApplyAdded={this.newApplyAdded} /> : ''}

                {this.state.updateFlag ?   <UpdateApply data={this.singleApplyData} updateApply={this.updateApply}  /> : ''}
                {this.state.deleteFlag ? <div className="ApplyTable_delete">
                    <h2>Are you sure you want to delete</h2>
                    <h4>{this.singleApplyData.company}</h4>
                    <div><button onClick={()=>this.deleteApply()}>YES</button></div>
                    <div><button onClick={()=>this.setState({deleteFlag:false})}>No</button></div>
                </div>: ''}

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
                        <th>More Details</th>
                        </tr>
                    </thead>
                    <tbody>
                     {this.state.jobApplies.map((j,i)=> 
                     <tr key={i} >
                        <td>{j.date}</td>
                        <td>{j.company}</td>
                        <td>{j.location}</td>
                        <td>{j.product}</td>
                        <td>{j.status}</td>
                        <td>{j.cvversion}</td>
                        <td>{j.tech}</td>
                        <td>{j.isAnswered ? 'YES' : 'NO'}</td>
                        <td> <span onClick={()=>{this.singleApplyData = {...j};
                        console.log( this.singleApplyData,'this is single App');
                        
                            this.singleApplyData.index = i;
                            this.setState({updateFlag:!this.state.updateFlag})}}>
                            <span role="img" aria-label="handwrite">✍</span>Update</span>

                           | <span onClick={()=> {this.setState({deleteFlag:!this.state.deleteFlag});
                             this.singleApplyData = {company:j.company, id:j._id, index:i};
                        } }>
                            <span role="img" aria-label="sciccors">✂</span> Delete</span>
                         </td>
                         
                         <td onClick={()=>{this.getMoreDetails(j)}} >More Details</td>

                     </tr>
                     )}
                    </tbody>
                </Table>
            </div>
        )
    }
    
    getMoreDetails = (singleAppyObj)=>{
        this.setState({moreDetailsFlag:true});
        this.singleApplyData = singleAppyObj;
    }

    componentDidMount(){

        axios.get('/jobapply')
        .then(res=>{
            if (res.status === 200) {
            this.setState({jobApplies : res.data})}
                })
        .catch( error =>
          console.log(error)
        );
}

}