import React, { Component } from 'react';
import './SearchBar.css'

export default class SearchBar extends Component {

    searchBy = {
        status: '',
        statusCheck:'',
        company: '',
        companyCheck:''
    }

    render() {
        
        return (
            <div className="SearchBar">
                <h3>Search Applys</h3>

                <form className="form-inline" onSubmit={(e) => this.fillterdDataDisplay(e)}>
                    <label htmlFor='company'> <input type="checkbox" onChange={this.getInputsData} name="companyCheck" />
                     Search by Company Name
                    <input id="company"  className="form-control form-control-sm ml-3" onChange={this.getInputsData}
                        name="company" type="text" placeholder="company name"
                        aria-label="Search" />
                         </label>

                    <label htmlFor="status" > <input type="checkbox" onChange={this.getInputsData} name="statusCheck"/>
                         Search by Status
                        <select id="status" name="status" onChange={this.getInputsData} >
                            <option defaultValue >Pending</option>
                            <option>Phone interview</option>
                            <option>HR interview</option>
                            <option>Technical interview</option>
                            <option>Assignment</option>
                        </select>
                    </label>
                    <button type="submit">
                        Submit
                </button>   
            
                </form>
                 <button onClick={()=> this.props.displayFilterdData(this.props.applies,false) }>
                        Show All
                </button>

            </div>
        )
    }
    getInputsData = (e) => {
         this.searchBy[e.target.name] = e.target.value;
        if (e.target.type === 'checkbox') {
            console.log('check Box',e.target.checked);
           return this.searchBy[e.target.name] = e.target.checked    
        }
    }

    fillterdDataDisplay = (e) => {
        const { applies,displayFilterdData } = this.props
        e.preventDefault();

        if (this.searchBy.companyCheck) {
            console.log('inside company',this.searchBy.company);

            let companies = applies.filter(j => j.company === this.searchBy.company)
            console.log(companies);
            displayFilterdData(companies,true)
        }
        if (this.searchBy.statusCheck) {
            console.log('inside status');
            
            let status = applies.filter(j => j.status.current === this.searchBy.status )
            console.log(status);
            displayFilterdData(status,true)
            
        }

    }

}
