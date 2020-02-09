import React, { Component } from 'react'

export default class SearchBar extends Component {

    searchBy = {
        searchSelector :'',
        searchByName :'',
    }

    render() {    
        return (
            <div>
                <h3>Search Applys</h3>

                <form className="form-inline" onSubmit={(e)=>this.fillterdDataDisplay(e)}>    
                <i className="fas fa-search" aria-hidden="true"></i>
                <input className="form-control form-control-sm ml-3" onChange={this.getInputsData}
                 name="searchByName"type="text" placeholder="Search"
                    aria-label="Search"/>

                 <label htmlFor="searchSelector"  > 
                    <select id="searchSelector" name="searchSelector" onChange={this.getInputsData} >
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
               

            </div>
        )
    }
    getInputsData = (e) => {
        this.searchBy[e.target.name] = e.target.value;
    }

    fillterdDataDisplay = (e)=>{    
        const {applies} = this.props    
        e.preventDefault();
        console.log(this.searchBy.searchByName);
        console.log(this.searchBy.searchSelector);

      if (this.searchBy.searchByName) {
       let Names = applies.filter(j => j.company === this.searchBy.searchByName )
       console.log(Names);
       
      }
      if (this.searchBy.searchSelector) {
       let status = applies.filter(j => j.status === this.searchBy.searchSelector)
       console.log(status);

      }
      
    }

}
