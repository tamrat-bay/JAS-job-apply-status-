import React from 'react';
import './SearchBar.css'

function SearchBar(props) {
    const { jobApplies, displayFilterdData } = props
    let searchBy = {
        status: 'Pending', //default Val
        statusCheck: false,
        company: '',
        companyCheck: false
    }
    const getInputsData = (e) => {
        searchBy[e.target.name] = e.target.value;
        localStorage[e.target.name] = e.target.value
        if (e.target.type === 'checkbox') {
            console.log('check Box', e.target.checked);
            localStorage[e.target.name] = e.target.checked
            console.log(JSON.parse(localStorage[e.target.name]));
            
            return searchBy[e.target.name] = JSON.parse(localStorage[e.target.name])
        }
    }

    const fillterdDataDisplay = (e) => {
        e.preventDefault();
        
        searchBy.companyCheck = localStorage.companyCheck ? JSON.parse(localStorage.companyCheck) : ''
        searchBy.statusCheck = localStorage.statusCheck ? JSON.parse(localStorage.statusCheck) : ''
        searchBy.status = localStorage.status ? localStorage.status : ''
        searchBy.company = localStorage.company ? localStorage.company : ''
                
        if (searchBy.companyCheck && searchBy.statusCheck) {
            let companies = jobApplies.filter(j => j.company === searchBy.company);
            let byCompanieAndStatus = companies.filter(j => j.status.current === searchBy.status)
            displayFilterdData(byCompanieAndStatus, true)
        }
        else if (searchBy.companyCheck) {
            let byCompanies = jobApplies.filter(j => j.company === searchBy.company)
            displayFilterdData(byCompanies, true)
        }
        else if (searchBy.statusCheck) {
            let byStatus = jobApplies.filter(j => j.status.current === searchBy.status)
            displayFilterdData(byStatus, true)
        }
        else {
            alert('Please Select Search Method');
        }
    }
    return (
        <div className="SearchBar">
            <h3>Search Applys</h3>

            <form className="form-inline" onSubmit={(e) => fillterdDataDisplay(e)}>
                <label htmlFor='company'> 
                <input type="checkbox" onChange={getInputsData} name="companyCheck" />
                    Search by Company Name
            <input id="company" 
                        className="form-control form-control-sm ml-3" 
                        onChange={getInputsData}
                        name="company" 
                        type="text" 
                        placeholder="company name"
                        aria-label="Search" />
                </label>

                <label htmlFor="status" > 
                <input type="checkbox" 
                onChange={getInputsData} 
                name="statusCheck" />
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
            <button onClick={() => displayFilterdData(jobApplies)}>
                Show All
        </button>

        </div>
    )
}

export default SearchBar
