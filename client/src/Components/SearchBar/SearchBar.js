import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { exportTableToCsv } from '../../utils/exportTableToCsv';
import { exportTableToXlsx } from '../../utils/exportTableToXlsx';
import './SearchBar.css'


const SearchBar = (props) => {

    console.log('SearchBar render'.toUpperCase());


    const { filterApllies, setFilterFlag, allJobApplies, setDisplayList , setSearchValues} = props;

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

    // let searchBy = {
    //     status: 'Pending', //default Val
    //     statusCheck: false,
    //     company: '',
    //     companyCheck: false
    // };

    // const getInputsData = (e) => {
    //     searchBy[e.target.name] = e.target.value;
    //     sessionStorage[e.target.name] = e.target.value
    //     if (e.target.type === 'checkbox') {
    //         console.log('check Box', e.target.checked);
    //         sessionStorage[e.target.name] = e.target.checked
    //         console.log(JSON.parse(sessionStorage[e.target.name]));

    //         return searchBy[e.target.name] = JSON.parse(sessionStorage[e.target.name])
    //     };
    // };



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
        console.log('SearchBar entries',Object.entries(values));
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
                    Search by Company Name
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
                    Search by Status
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
                    <div className="SearchBar_formButtons">
                        <button type="submit">Search</button>
                        <div onClick={showAll}>Clear All</div>
                    </div>
                    
                   
                </form>
                

                    <div className="SearchBar_exports">
                        <button onClick={exportTableToCsv}>Export to CSV</button>
                        <button onClick={exportTableToXlsx}>Export to XLSX</button>
                    </div>

            </div>
        </div>
    )
};
export default SearchBar;