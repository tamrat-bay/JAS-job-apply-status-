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
import axios from 'axios';
import './ApplyTable.css';


const ApplyTable = () => {

    const [allJobApplies, setAllJobApplies] = useState([]);
    const [displayList, setDisplayList] = useState([]);
    const [filterFlag, setFilterFlag] = useState(false)
    const [addNewFlag, setAddNewFlag] = useToggle(false);
    const [updateFlag, setUpdateFlag] = useToggle(false);
    const [deleteFlag, setDeleteFlag] = useToggle(false);
    const [moreDetailsFlag, setMoreDetailsFlag] = useToggle(false);
    const jasStore = useJasStore()


    const getApplies = () => {

        const { id, token } = JSON.parse(localStorage.jas_login);

        axios({
            method: 'get',
            url: `/jobapply/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.status === 200) {

                    setAllJobApplies([...res.data]);
                };
            })
            .catch(error =>
                console.log(error.response.data)
            );
    };

    const addNewApply = (data) => {

        const temp = [...allJobApplies];
        temp.push(data);

        setAllJobApplies(temp);
        setAddNewFlag();
    };

    const updateApply = (data) => {

        const temp = [...allJobApplies];
        const index = temp.findIndex(apply => apply._id === data._id);
        temp[index] = { ...data };

        setAllJobApplies(temp);
        setDisplayList(temp);
        setUpdateFlag();
    };

    const getMoreDetails = (data) => {

        jasStore.setSingleApplyData(data);
        setMoreDetailsFlag();
    };

    const deleteApply = () => {

        const { _id } = jasStore.singleApplyData;
        const { token } = JSON.parse(localStorage.jas_login);

        axios({
            method: 'delete',
            url: `/jobapply/${_id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.status === 200) {

                    const temp = [...allJobApplies];
                    const index = temp.findIndex(apply => apply._id === jasStore.singleApplyData._id);
                    temp.splice(index, 1);
                    setAllJobApplies(temp);

                    setDeleteFlag()
                };
            })
            .catch(err => console.log(err))
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
            let companies = allJobApplies.filter(j => j.company.toLowerCase() === searchBy.company.toLowerCase());
            let byCompanieAndStatus = companies.filter(j => j.status.current === searchBy.status);

            setDisplayList(byCompanieAndStatus);

            //search by company name
        } else if (searchBy.companyCheck) {
            let byCompanies = allJobApplies.filter(j => j.company.toLowerCase() === searchBy.company.toLowerCase());

            setDisplayList(byCompanies);

            //search by status
        } else if (searchBy.statusCheck) {
            let byStatus = allJobApplies.filter(j => j.status.current === searchBy.status);

            setDisplayList(byStatus);
        } else {
            setFilterFlag(false);
            return alert('Please Select Search Method');
        };
    };

    useEffect(() => {
        if (jasStore.isUserLogged) {
            getApplies();
        };
    }, [jasStore.isUserLogged, updateFlag]);

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
                        addNewFlag ?
                            <NewApply
                                addNewApply={addNewApply}
                                closeMe={setAddNewFlag}
                            />
                            : ''
                    }

                    {
                        updateFlag ?
                            <UpdateApply
                                updateApply={updateApply}
                                closeMe={setUpdateFlag}
                            />
                            :
                            ''}

                    {
                        deleteFlag ?
                            <>
                                <div className='ApplyTable_delete'>
                                    <i className='far fa-times-circle'></i>
                                    <h2>Are you sure?</h2>
                                    <span>
                                        <p> Do you really want to delete this apply? ({jasStore.singleApplyData.company}).</p>
                                        <p>This process cannot be undone.</p>
                                    </span>
                                    <div className='ApplyTable_delete_buttons'>
                                        <button className='ApplyTable_delete_buttons_delete' onClick={deleteApply}>Delete</button>
                                        <button className='ApplyTable_delete_buttons_cancel' onClick={setDeleteFlag}>Cancel</button>
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
                        allJobApplies={allJobApplies}
                        setDisplayList={setDisplayList}
                        setAddNewFlag={setAddNewFlag}
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
                                    displayList.map((j, i) =>
                                        <TableRowData
                                            key={i}
                                            job={j}
                                            setDeleteFlag={setDeleteFlag}
                                            setUpdateFlag={setUpdateFlag}
                                            getMoreDetails={getMoreDetails}
                                            updateFlag={updateFlag}
                                            addNewFlag={addNewFlag}
                                            setAddNewFlag={setAddNewFlag}
                                        />
                                    )
                                    :
                                    allJobApplies.map((j, i) =>
                                        <TableRowData
                                            key={i}
                                            index={i}
                                            job={j}
                                            setDeleteFlag={setDeleteFlag}
                                            setUpdateFlag={setUpdateFlag}
                                            getMoreDetails={getMoreDetails}
                                            updateFlag={updateFlag}
                                            addNewFlag={addNewFlag}
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