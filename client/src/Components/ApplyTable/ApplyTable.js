import React, { useState, useEffect, useContext } from 'react'
import NewApply from '../NewApply/NewApply';
import UpdateApply from '../UpdateApply/UpdateApply';
import MoreDetails from '../MoreDetails/MoreDetails';
import SearchBar from '../SearchBar/SearchBar';
import TableRowData from './TableRowData';
import { Redirect } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import useToggle from '../../hooks/useToggleState'
import { IsUserLoggedContext } from '../../context/IsUserLoggedContext'
import axios from 'axios';
import './ApplyTable.css';


const ApplyTable = () => {

    const [allJobApplies, setAllJobApplies] = useState([]);
    const [displayList, setDisplayList] = useState([]);

    const [singleApplyData, setSingleApplyData] = useState({});
    const [filterFlag, setFilterFlag] = useState((sessionStorage.status || sessionStorage.company) ? true : false)
    const [addNewFlag, setAddNewFlag] = useToggle(false);
    const [updateFlag, setUpdateFlag] = useToggle(false);
    const [deleteFlag, setDeleteFlag] = useToggle(false);
    const [moreDetailsFlag, setMoreDetailsFlag] = useToggle(false);
    const { isUserLogged } = useContext(IsUserLoggedContext);


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
                    setDisplayList([...res.data]);
                };
            })
            .catch(error =>
                console.log(error.response.data)
            );
    };

    const closeAddNewApplyPopup = () => setAddNewFlag();
    const closeUpdateApplyPopup = () => setUpdateFlag();

    const addNewApply = (data) => {

        console.log(data);

        const temp = [...allJobApplies];
        temp.push(data);

        setAllJobApplies(temp);
        setDisplayList(temp);
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

        setSingleApplyData(data);
        console.log('more details', data);
        setMoreDetailsFlag();
    };

    const deleteApply = () => {
        const { id } = singleApplyData;
        const { token } = JSON.parse(localStorage.jas_login);

        axios({
            method: 'delete',
            url: `/jobapply/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.status === 200) {

                    const temp = [...allJobApplies];
                    const index = temp.findIndex(apply => apply._id === singleApplyData._id);
                    temp.splice(index, 1);
                    setAllJobApplies(temp);
                    setDisplayList(temp);
                    setDeleteFlag()
                };
            })
            .catch(err => console.log(err))
    };

    const filterApllies = () => {

        const searchBy = {
            companyCheck: sessionStorage.companyCheck ? JSON.parse(sessionStorage.companyCheck) : '',
            statusCheck: sessionStorage.statusCheck ? JSON.parse(sessionStorage.statusCheck) : '',
            status: sessionStorage.status ? sessionStorage.status : 'Pending',
            company: sessionStorage.company ? sessionStorage.company : ''
        };

        if (searchBy.companyCheck && searchBy.statusCheck) {
            let companies = allJobApplies.filter(j => j.company === searchBy.company);
            let byCompanieAndStatus = companies.filter(j => j.status.current === searchBy.status);
            console.log("byCompanieAndStatus");

            setDisplayList(byCompanieAndStatus);
        } else if (searchBy.companyCheck) {
            let byCompanies = allJobApplies.filter(j => j.company === searchBy.company);
            console.log("byCompanies ");

            setDisplayList(byCompanies);
        } else if (searchBy.statusCheck) {
            let byStatus = allJobApplies.filter(j => j.status.current === searchBy.status);
            console.log("byStatus")
            setDisplayList(byStatus);
        } else {
            alert('Please Select Search Method');
        };
    };

    useEffect(() => {
        //protect route 
        if (isUserLogged) {
            getApplies();
        };

        //show filterd apllies after update
        if (!updateFlag && filterFlag) {
            filterApllies();
        };

    }, [isUserLogged, updateFlag, filterFlag]);



    if (!isUserLogged) return <Redirect to="/" />;

    return (
        <div className="ApplyTable">
            <Container>
                {moreDetailsFlag ? <MoreDetails data={singleApplyData}
                    close={() => setMoreDetailsFlag()} /> : ''}
                <div style={{ height: "20px", margin: "15px" }}>
                    {!addNewFlag && !updateFlag ?
                        <button onClick={() => setAddNewFlag()}>Add New Apply</button> : ""}
                </div>
                {
                    addNewFlag ?
                        <NewApply
                            addNewApply={addNewApply}
                            closeMe={closeAddNewApplyPopup}
                        />
                        : ''
                }
                {
                    updateFlag ? <UpdateApply
                        initialValues={singleApplyData}
                        updateApply={updateApply}
                        closeMe={closeUpdateApplyPopup}
                    /> : ''
                }
                {
                    deleteFlag ? <div className="ApplyTable_delete">
                        <h2>Are you sure you want to delete?</h2>
                        <h3>({singleApplyData.company})</h3>
                        <div className='ApplyTable_delete_butons'>
                            <button onClick={() => deleteApply()}>Yes</button>
                            <button onClick={() => setDeleteFlag()}>No</button>
                        </div>
                    </div> : ''
                }

                <SearchBar
                    filterApllies={filterApllies}
                    setFilterFlag={setFilterFlag}
                    allJobApplies={allJobApplies}
                    setDisplayList={setDisplayList}
                />

                <Table bordered>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Company</th>
                            <th>Status</th>
                            <th>Update / Delete</th>
                            <th>More Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayList.map((j, i) =>
                            <TableRowData
                                key={i}
                                job={j}
                                setDeleteFlag={setDeleteFlag}
                                setUpdateFlag={setUpdateFlag}
                                setSingleApplyData={setSingleApplyData}
                                getMoreDetails={getMoreDetails}
                            />
                        )}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
};
export default ApplyTable;
