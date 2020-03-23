import React from 'react';
import './SearchBar.css'

function SearchBar(props) {
    console.log('search bar',props);
const { jobApplies,displayFilterdData } = props
   let searchBy = {
        status: 'Pending', //default Val
        statusCheck:false,
        company: '',
        companyCheck:false
    }
  const  getInputsData = (e) => {
        searchBy[e.target.name] = e.target.value;
       if (e.target.type === 'checkbox') {
           console.log('check Box',e.target.checked);
          return searchBy[e.target.name] = e.target.checked    
       }
   }

   const fillterdDataDisplay = (e) => {
       
       e.preventDefault();

       if (searchBy.companyCheck) {
           console.log('inside company',searchBy.company);

           let companies = jobApplies.filter(j => j.company === searchBy.company)
           console.log(companies);
           displayFilterdData(companies,true)
       }
      else if (searchBy.statusCheck) {
           console.log('inside status');
           console.log('inside status');
           
           let status = jobApplies.filter(j => j.status.current === searchBy.status )
           console.log(status);
           displayFilterdData(status,true)
       }
       else{
           console.log('Please Select Search Method');
           
       }

   }
    return (
        <div className="SearchBar">
        <h3>Search Applys</h3>

        <form className="form-inline" onSubmit={(e) => fillterdDataDisplay(e)}>
            <label htmlFor='company'> <input type="checkbox" onChange={getInputsData} name="companyCheck" />
             Search by Company Name
            <input id="company"  className="form-control form-control-sm ml-3" onChange={getInputsData}
                name="company" type="text" placeholder="company name"
                aria-label="Search" />
                 </label>

            <label htmlFor="status" > <input type="checkbox" onChange={getInputsData} name="statusCheck"/>
                 Search by Status
                <select id="status" name="status" onChange={getInputsData} >
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
         <button onClick={()=> displayFilterdData(jobApplies) }>
                Show All
        </button>

    </div>
    )
}

export default SearchBar
