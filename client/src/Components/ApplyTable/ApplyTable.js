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
    const [searchValues, setSearchValues] = useState({});

    const [singleApplyData, setSingleApplyData] = useState({});
    const [filterFlag, setFilterFlag] = useState((sessionStorage.status || sessionStorage.companyCheck) ? true : false)
    const [addNewFlag, setAddNewFlag] = useToggle(false);
    const [updateFlag, setUpdateFlag] = useToggle(false);
    const [deleteFlag, setDeleteFlag] = useToggle(false);
    const [moreDetailsFlag, setMoreDetailsFlag] = useToggle(false);
    const { isUserLogged } = useContext(IsUserLoggedContext);

    console.log('displayList',displayList);
    console.log('singleApplyData',singleApplyData);
    console.log('filterFlag',filterFlag);
    

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
                    // setDisplayList([...res.data]) ;
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
                    // setDisplayList(temp);
                    setDeleteFlag()
                };
            })
            .catch(err => console.log(err))
    };

    const filterApllies = (searchValues) => {
console.log('filterApllies activated searchValues',searchValues);

        const searchBy = {
            companyCheck: searchValues.companyCheck ? searchValues.companyCheck : '',
            statusCheck: searchValues.statusCheck ? searchValues.statusCheck : '',
            status: searchValues.status ? searchValues.status : 'Pending',
            company: searchValues.company ? searchValues.company : ''
        };

        if (searchBy.companyCheck && searchBy.statusCheck) {
            let companies = allJobApplies.filter(j => j.company === searchBy.company);
            let byCompanieAndStatus = companies.filter(j => j.status.current === searchBy.status);
            console.log("byCompanieAndStatus");

            setDisplayList(byCompanieAndStatus);
        } else if (searchBy.companyCheck) {
            let byCompanies = allJobApplies.filter(j => j.company === searchBy.company);
            console.log("byCompanies" ,allJobApplies);
            console.log("byCompanies" ,byCompanies);

            setDisplayList(byCompanies);
        } else if (searchBy.statusCheck) {
            let byStatus = allJobApplies.filter(j => j.status.current === searchBy.status);
            console.log("byStatus")
            setDisplayList(byStatus);
        } else {
            setFilterFlag(false);
           return alert('Please Select Search Method');
        };
    };

    useEffect(() => {
        //protect route 
        if (isUserLogged) {
            getApplies();
        };

        //show filterd apllies after update
        // if (!updateFlag && filterFlag) {
        //     filterApllies(searchValues);
        // };

    }, [isUserLogged, updateFlag, filterFlag]);



    if (!isUserLogged) return <Redirect to="/" />;

    return (
        <div className="ApplyTable">
            <Container>
            {moreDetailsFlag ? <MoreDetails data={singleApplyData}
                close={() => setMoreDetailsFlag()} /> : ''}
   
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
                setSearchValues={setSearchValues}
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
                            setSingleApplyData={setSingleApplyData}
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
                        job={j} index={i}
                        setDeleteFlag={setDeleteFlag}
                        setUpdateFlag={setUpdateFlag}
                        setSingleApplyData={setSingleApplyData}
                        getMoreDetails={getMoreDetails}
                        updateFlag={updateFlag}
                        addNewFlag={addNewFlag}
                    />
                    )
                }
                </tbody>
            </Table>
            </Container>
        </div>
    )
};
export default ApplyTable;

