import React, { useEffect } from 'react';
import './SearchBar.css'

function SearchBar({ jobApplies, displayFilterdData }) {

    let searchBy = {
        status: 'Pending', //default Val
        statusCheck: false,
        company: '',
        companyCheck: false
    }
    const getInputsData = (e) => {
        searchBy[e.target.name] = e.target.value;
        sessionStorage[e.target.name] = e.target.value
        if (e.target.type === 'checkbox') {
            console.log('check Box', e.target.checked);
            sessionStorage[e.target.name] = e.target.checked
            console.log(JSON.parse(sessionStorage[e.target.name]));

            return searchBy[e.target.name] = JSON.parse(sessionStorage[e.target.name])
        }
    }
    const showAll = (e) => {
        sessionStorage.clear();
        displayFilterdData(jobApplies, false);
        //Remove checked box when show all is clicked
        e.target.parentElement.children[1].children[1].children[0].checked = false;
        e.target.parentElement.children[1].children[0].children[0].checked = false;
    }

    useEffect(() => {

        return () => {
            sessionStorage.clear()
        }
    }, [])

    const fillterdDataDisplay = (e) => {
        e.preventDefault();

        searchBy.companyCheck = sessionStorage.companyCheck ? JSON.parse(sessionStorage.companyCheck) : ''
        searchBy.statusCheck = sessionStorage.statusCheck ? JSON.parse(sessionStorage.statusCheck) : ''
        searchBy.status = sessionStorage.status ? sessionStorage.status : 'Pending'
        searchBy.company = sessionStorage.company ? sessionStorage.company : ''

        if (searchBy.companyCheck && searchBy.statusCheck) {
            let companies = jobApplies.filter(j => j.company === searchBy.company);
            let byCompanieAndStatus = companies.filter(j => j.status.current === searchBy.status);
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
                    <input type="checkbox"
                        onChange={getInputsData}
                        defaultChecked={sessionStorage.companyCheck || false}
                        name="companyCheck" />
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
                        defaultChecked={sessionStorage.statusCheck || false}
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
            <button onClick={(e) => showAll(e)}>
                Show All
        </button>

        </div>
    )
}

export default SearchBar
