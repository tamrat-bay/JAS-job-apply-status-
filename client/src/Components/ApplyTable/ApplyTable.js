import React, { useState, useEffect } from 'react';
import NewApply from '../NewApply/NewApply';
import UpdateApply from '../UpdateApply/UpdateApply';
import MoreDetails from '../MoreDetails/MoreDetails';
import SearchBar from '../SearchBar/SearchBar';
import TableRowData from './TableRowData';
import { Redirect } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import { useObserver } from "mobx-react";
import { useJasStore } from "../../context/JasStoreContext";
import useToggle from '../../hooks/useToggleState';
// import axios from 'axios';
import './ApplyTable.css';


const ApplyTable = () => {

    const [filterFlag, setFilterFlag] = useState(false)
    const [moreDetailsFlag, setMoreDetailsFlag] = useToggle(false);
    const jasStore = useJasStore()

    const getMoreDetails = (data) => {
        jasStore.setSingleApplyData(data);
        setMoreDetailsFlag();
    };

    const filterApllies = (searchValues) => {
        const searchBy = {
            companyCheck: searchValues.companyCheck ? searchValues.companyCheck : '',
            statusCheck: searchValues.statusCheck ? searchValues.statusCheck : '',
            status: searchValues.status ? searchValues.status : 'Pending',
            company: searchValues.company ? searchValues.company : ''
        };

        //search by company name and status
        if (searchBy.companyCheck && searchBy.statusCheck) {
            let companies = jasStore.allJobApplies.filter(j => j.company.toLowerCase() === searchBy.company.toLowerCase());
            let byCompanieAndStatus = companies.filter(j => j.status.current === searchBy.status);

            jasStore.setDisplayList(byCompanieAndStatus);

            //search by company name
        } else if (searchBy.companyCheck) {
            let byCompanies = jasStore.allJobApplies.filter(j => j.company.toLowerCase() === searchBy.company.toLowerCase());

            jasStore.setDisplayList(byCompanies);

            //search by status
        } else if (searchBy.statusCheck) {
            let byStatus = jasStore.allJobApplies.filter(j => j.status.current === searchBy.status);

            jasStore.setDisplayList(byStatus);
        } else {
            setFilterFlag(false);
            return alert('Please Select Search Method');
        };
    };

    useEffect(() => {
        if (jasStore.isUserLogged) {
            jasStore.getApplies();
        };
    }, [jasStore.updateFlag, jasStore]);

    return useObserver(() => {
        if (!jasStore.isUserLogged) return <Redirect to='/' />;

        return (
            <div className='ApplyTable'>
                <Container>

                    {moreDetailsFlag ?

                        <MoreDetails
                            close={setMoreDetailsFlag}
                        />
                        :
                        ''}

                    {
                        jasStore.addNewFlag ?
                            <NewApply />
                            : ''
                    }

                    {
                        jasStore.updateFlag ?
                            <UpdateApply />
                            :
                            ''}

                    {
                        jasStore.deleteFlag ?
                            <>
                                <div className='ApplyTable_delete'>
                                    <i className='far fa-times-circle'></i>
                                    <h2>Are you sure?</h2>
                                    <span>
                                        <p> Do you really want to delete this apply? ({jasStore.singleApplyData.company}).</p>
                                        <p>This process cannot be undone.</p>
                                    </span>
                                    <div className='ApplyTable_delete_buttons'>
                                        <button className='ApplyTable_delete_buttons_delete' onClick={jasStore.deleteApply}>Delete</button>
                                        <button className='ApplyTable_delete_buttons_cancel' onClick={jasStore.setDeleteFlag}>Cancel</button>
                                    </div>
                                </div>
                                <div className='ApplyTable-dim-background'></div>
                            </>
                            :
                            ''
                    }

                    <SearchBar
                        filterApllies={filterApllies}
                        setFilterFlag={setFilterFlag}
                    />

                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Company</th>
                                <th>Status</th>
                                <th>Edit / Delete</th>
                                <th>More Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filterFlag
                                    ?
                                    jasStore.displayList.map((j, i) =>
                                        <TableRowData
                                            key={i}
                                            job={j}
                                            getMoreDetails={getMoreDetails}
                                        />
                                    )
                                    :
                                    jasStore.allJobApplies.map((j, i) =>
                                        <TableRowData
                                            key={i}
                                            index={i}
                                            job={j}
                                            getMoreDetails={getMoreDetails}
                                        />
                                    )
                            }
                        </tbody>
                    </Table>
                </Container>
            </div>)
    }
    );
};
export default ApplyTable;