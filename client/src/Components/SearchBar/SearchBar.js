import React, { useEffect } from 'react';
import { exportTableToCsv } from '../../utils/exportTableToCsv';
import { exportTableToXlsx } from '../../utils/exportTableToXlsx';
import './SearchBar.css'


const SearchBar = (props) => {

    console.log('SearchBar render'.toUpperCase());


    const { filterApllies, setFilterFlag, allJobApplies, setDisplayList } = props;

    let searchBy = {
        status: 'Pending', //default Val
        statusCheck: false,
        company: '',
        companyCheck: false
    };

    const getInputsData = (e) => {
        searchBy[e.target.name] = e.target.value;
        sessionStorage[e.target.name] = e.target.value
        if (e.target.type === 'checkbox') {
            console.log('check Box', e.target.checked);
            sessionStorage[e.target.name] = e.target.checked
            console.log(JSON.parse(sessionStorage[e.target.name]));

            return searchBy[e.target.name] = JSON.parse(sessionStorage[e.target.name])
        };
    };

    const showAll = (e) => {
        sessionStorage.clear();
        setFilterFlag(false);
        setDisplayList(allJobApplies)

        //clear form values
        const statusCheck = e.target.parentElement.children[1].children[1].children[0];
        const companyCheck = e.target.parentElement.children[1].children[0].children[0];
        const companyName = e.target.parentElement.children[1].children[0].children[1];

        statusCheck.checked = false;
        companyCheck.checked = false;
        companyName.value = '';
    };


    useEffect(() => {

        return () => {
            sessionStorage.clear()
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFilterFlag(true);
        filterApllies();
    };

    return (
        <div className="SearchBar">
            <h3>Search Applys</h3>
            <div className="SearchBar-container">
                <form className="form-inline" onSubmit={handleSubmit}>
                    <label htmlFor='company'>
                        <input type="checkbox"
                            onChange={getInputsData}
                            defaultChecked={sessionStorage.companyCheck || false}
                            name="companyCheck"
                        />
                    Search by Company Name
                    <input id="company"
                            className="form-control form-control-sm ml-3"
                            onChange={getInputsData}
                            name="company"
                            defaultValue={sessionStorage.company || ''}
                            type="text"
                            placeholder="company name"
                            aria-label="Search"
                        />
                    </label>

                    <label htmlFor="status">
                        <input
                            type="checkbox"
                            onChange={getInputsData}
                            defaultChecked={sessionStorage.statusCheck || false}
                            name="statusCheck"
                        />
                    Search by Status
                    <select id="status" name="status" defaultValue={sessionStorage.status || 'Pending'} onChange={getInputsData} >
                            <option defaultValue>Pending</option>
                            <option>Phone interview</option>
                            <option>HR interview</option>
                            <option>Technical interview</option>
                            <option>Assignment</option>
                        </select>
                    </label>
                    <button type="submit">Submit</button>
                </form>
                <button onClick={showAll}>Clear All</button>
                <button onClick={exportTableToCsv}>Export to CSV</button>
                <button onClick={exportTableToXlsx}>Export to XLSX</button>
            </div>
        </div>
    )
};
export default SearchBar;