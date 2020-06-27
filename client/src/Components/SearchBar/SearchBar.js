import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useFormik } from 'formik';
import { objToSheet } from '../../utils/ObjToSheet';
import './SearchBar.css';


const SearchBar = (props) => {

    const {
        filterApllies,
        setFilterFlag,
        setAddNewFlag,
        allJobApplies
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
            handleSubmit(values);
        },
    });


    const showAll = (e) => {
        setFilterFlag(false);

        formik.resetForm()
        //clear form values
        const statusCheck = document.getElementById('statusCheck');
        const companyCheck = document.getElementById('companyCheck');
        const companyName = document.getElementById('company');

        statusCheck.checked = false;
        companyCheck.checked = false;
        companyName.value = '';
    };

    const handleSubmit = (values) => {
        setFilterFlag(true);
        filterApllies(values);
    };

    return (
        <div className="SearchBar">
            <div className="SearchBar-container">
                <form
                    className="form-inline"
                    onSubmit={formik.handleSubmit}
                >
                    <OverlayTrigger overlay={<Tooltip id="searchBycompany">Search by company name</Tooltip>}>
                        <label htmlFor='company'>
                            <div>
                                <input type="checkbox"
                                    onChange={formik.handleChange}
                                    value={formik.values.companyCheck}
                                    id="companyCheck"
                                    name="companyCheck"
                                />
                                {/* Search by Company Name */}
                            </div>
                            <input id="company"
                                onChange={formik.handleChange}
                                value={formik.values.company}
                                name="company"
                                type="text"
                                placeholder="Company name"
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
                                    onChange={formik.handleChange}
                                    value={formik.values.statusCheck}
                                    name="statusCheck"
                                />
                            </div>
                            <select id="status"
                                name="status"
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
                        <span>NEW</span>
                        </button>
                </OverlayTrigger>

                <OverlayTrigger overlay={<Tooltip id="dwnCsv">Download as CSV file</Tooltip>}>
                    <button onClick={() => objToSheet(allJobApplies, 'csv')}>
                        <i className="fas fa-download"></i>
                        <span>CSV</span>
                    </button>
                </OverlayTrigger>

                <OverlayTrigger overlay={<Tooltip id="dwnXlsx">Download as XLSX file</Tooltip>}>
                    <button onClick={() => objToSheet(allJobApplies, 'xlsx')}>
                        <i className="fas fa-download"></i>
                        <span>XLSX</span>
                    </button>
                </OverlayTrigger>
            </div>
        </div>
    );
};
export default SearchBar;