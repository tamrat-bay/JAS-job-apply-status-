import React, { useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useFormik } from 'formik';
import { exportTableToCsv } from '../../utils/exportTableToCsv';
import { exportTableToXlsx } from '../../utils/exportTableToXlsx';
import './SearchBar.css'


const SearchBar = (props) => {

    console.log('SearchBar render'.toUpperCase());


    const {
        filterApllies,
        setFilterFlag,
        allJobApplies,
        setDisplayList,
        setAddNewFlag,
        setSearchValues,
        addNewFlag
    } = props;

    const formik = useFormik({
        initialValues:
        {
            status: 'Pending', //default Val
            statusCheck: false,
            company: '',
            companyCheck: false
        }
        ,
        onSubmit: values => {
            console.log("form value Search bar", values);

            handleSubmit(values);

        },
    });


    const showAll = (e) => {
        sessionStorage.clear();
        setFilterFlag(false);
        setDisplayList(allJobApplies)
        formik.resetForm()
        //clear form values
        const statusCheck = document.getElementById('statusCheck');
        const companyCheck = document.getElementById('companyCheck');
        const companyName = document.getElementById('company');

        statusCheck.checked = false;
        companyCheck.checked = false;
        companyName.value = '';
    };


    useEffect(() => {

        return () => {
            sessionStorage.clear()
        }
    }, []);

    const handleSubmit = (values) => {
        // console.log('SearchBar submit',values);
        console.log('SearchBar entries', Object.entries(values));
        // Object.entries(values).map(v => {
        //     sessionStorage[v[0]] = v[1];
        //     if (sessionStorage[v[0]] === 'statusCheck' && !sessionStorage[v[1]]) {
        //         sessionStorage[v[0]] = false
        //     }
        //     if (sessionStorage[v[0]] === 'companyCheck' && !sessionStorage[v[1]]) {
        //         sessionStorage[v[0]] = false
        //     }

        // })
        setSearchValues(values)
        // e.preventDefault();
        setFilterFlag(true);
        filterApllies(values);
    };

    return (
        <div className="SearchBar">
            {/* <h3>Search Applies</h3> */}
            <div className="SearchBar-container">
                <form className="form-inline" onSubmit={formik.handleSubmit}>

                    <OverlayTrigger overlay={<Tooltip id="searchBycompany">Search by company name</Tooltip>}>
                        <label htmlFor='company'>
                            <div>
                                <input type="checkbox"
                                    // onChange={getInputsData}
                                    onChange={formik.handleChange}
                                    value={formik.values.companyCheck}
                                    id="companyCheck"
                                    // defaultChecked={sessionStorage.companyCheck || false}
                                    name="companyCheck"
                                />
                                {/* Search by Company Name */}
                            </div>
                            <input id="company"
                                className="form-control form-control-sm ml-3"
                                // onChange={getInputsData}
                                // defaultValue={sessionStorage.company || ''}
                                onChange={formik.handleChange}
                                value={formik.values.company}
                                name="company"
                                type="text"
                                placeholder="company name"
                                aria-label="Search"
                            />
                        </label>
                    </OverlayTrigger>

                    <OverlayTrigger overlay={<Tooltip id="searchBystatus">Search apply status</Tooltip>}>

                        <label htmlFor="status">
                            <div>
                                <input
                                    type="checkbox"
                                    id='statusCheck'
                                    // onChange={getInputsData}
                                    // defaultChecked={sessionStorage.statusCheck || false}
                                    onChange={formik.handleChange}
                                    value={formik.values.statusCheck}
                                    name="statusCheck"
                                />
                                {/* Search by Status */}
                            </div>
                            <select id="status"
                                name="status"
                                //  defaultValue={sessionStorage.status || 'Pending'} 
                                //  onChange={getInputsData} 
                                onChange={formik.handleChange}
                                value={formik.values.status}
                            >
                                <option defaultValue>Pending</option>
                                <option>Phone interview</option>
                                <option>HR interview</option>
                                <option>Technical interview</option>
                                <option>Assignment</option>
                            </select>
                        </label>
                    </OverlayTrigger>

                    <div className="SearchBar_formButtons">
                        <button type="submit">Search</button>
                        <div onClick={showAll}>Clear</div>
                    </div>
                </form>
            </div>

            <div className="ApplyTable_Addnew">
                <OverlayTrigger rootClose overlay={<Tooltip id="addNew">Add New Job Apply</Tooltip>}>
                    <button onClick={setAddNewFlag}>
                        <i className="fas fa-plus-square"></i>
                        NEW
                        </button>
                </OverlayTrigger>

                <OverlayTrigger overlay={<Tooltip id="dwnCsv">Download as CSV file</Tooltip>}>
                    <button onClick={exportTableToCsv}>
                        <i className="fas fa-download"></i>
                            CSV
                            </button>
                </OverlayTrigger>

                <OverlayTrigger overlay={<Tooltip id="dwnXlsx">Download as XLSX file</Tooltip>}>
                    <button onClick={exportTableToXlsx}>
                        <i className="fas fa-download"></i>
                             XLSX</button>
                </OverlayTrigger>

            </div>
        </div>
    )
};
export default SearchBar;