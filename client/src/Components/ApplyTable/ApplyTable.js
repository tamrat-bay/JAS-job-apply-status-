import React, { useState, useEffect ,useContext } from 'react'
import Table from 'react-bootstrap/Table'
import NewApply from '../NewApply/NewApply';
import UpdateApply from '../UpdateApply/UpdateApply';
import MoreDetails from '../MoreDetails/MoreDetails';
import SearchBar from '../SearchBar/SearchBar';
import TableRowData from './TableRowData';
import { Redirect } from 'react-router-dom';
import useToggle from '../../hooks/useToggleState'
import './ApplyTable.css';
import axios from 'axios';
import { IsUserLoggedContext } from '../../context/IsUserLoggedContext'


const ApplyTable = () => {
    const [jobApplies, setJobApplies] = useState([]);
    const [filterdApplies, setFilterdApplies] = useState([]);
    const [singleApplyData, setSingleApplyData] = useState({});
    const [filterFlag, setFilterFlag] = useState( (sessionStorage.status || sessionStorage.company) ? true : false)
    const [addNewFlag, setAddNewFlag] = useToggle(false);
    const [updateFlag, setUpdateFlag] = useToggle(false);
    const [deleteFlag, setDeleteFlag] = useToggle(false);
    const [moreDetailsFlag, setMoreDetailsFlag] = useToggle(false);
    const { isUserLogged  } = useContext(IsUserLoggedContext);


    useEffect(() => {
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

                    setJobApplies(res.data)
                }
            })
            .catch(error =>
                console.log(error.response.data)
            );
    }, []);

    const closeAddNewApplyPopup = () => setAddNewFlag();

    const closeUpdateApplyPopup = () => setUpdateFlag();

    const displayFilterdData = (filterdData, bolean) => {
        // console.log('filtData', filtData);

        setFilterdApplies(filterdData)
        setFilterFlag(bolean)
    }
    const newApplyAdded = (data) => {
        const temp = jobApplies;
        temp.push(data);
        setJobApplies(temp)
        setAddNewFlag()
    };

    const updateApply = (data, i) => {
        let temp = [...jobApplies];
        temp[i] = { ...data };
        setJobApplies(temp);
        setUpdateFlag();
    };

    const deleteApply = () => {
        const { id, index } = singleApplyData;
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
                    const temp = jobApplies;
                    //ask tamrat about this ^^
                    temp.splice(index, 1)
                    setJobApplies(temp)
                    setDeleteFlag()
                }
            })
            .catch(err => console.log(err))
    };

    const getMoreDetails = (singleApplyObj) => {

        setSingleApplyData(singleApplyObj);
        console.log(singleApplyData, 'more details');
        setMoreDetailsFlag();

    }
if (!isUserLogged) return <Redirect to="/" />

    return (
        <div className="ApplyTable">
            {moreDetailsFlag ? <MoreDetails data={singleApplyData}
                close={() => setMoreDetailsFlag()} /> : ''}
            <div style={{ height: "20px", margin: "15px" }}>
                {!addNewFlag && !updateFlag ?
                    <button onClick={() => setAddNewFlag()}>Add New Apply</button> : ""}
            </div>
            {
                addNewFlag ?
                    <NewApply newApplyAdded={newApplyAdded}
                        closeMe={closeAddNewApplyPopup} />
                    : ''
            }
            {updateFlag ? <UpdateApply data={singleApplyData} updateApply={updateApply} closeMe={closeUpdateApplyPopup} /> : ''}
            {deleteFlag ? <div className="ApplyTable_delete">
                <h2>Are you sure you want to delete</h2>
                <h4>{singleApplyData.company}</h4>
                <div><button onClick={() => deleteApply()}>YES</button></div>
                <div><button onClick={() => setDeleteFlag()}>No</button></div>
            </div> : ''}

            <SearchBar 
            jobApplies={jobApplies} 
            displayFilterdData={displayFilterdData} 
            filterFlag={filterFlag} />

            <Table striped bordered hover variant="dark">
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
                    {filterFlag ?
                        filterdApplies.map((j, i) =>
                            <TableRowData
                                key={i}
                                job={j} index={i}
                                setDeleteFlag={setDeleteFlag}
                                setUpdateFlag={setUpdateFlag}
                                // singleApplyData={singleApplyData}
                                setSingleApplyData={setSingleApplyData}
                                getMoreDetails={getMoreDetails}
                            />
                        )
                        :
                        jobApplies.map((j, i) =>
                            <TableRowData
                                key={i}
                                job={j} index={i}
                                setDeleteFlag={setDeleteFlag}
                                setUpdateFlag={setUpdateFlag}
                                // singleApplyData={singleApplyData}
                                setSingleApplyData={setSingleApplyData}
                                getMoreDetails={getMoreDetails}
                            />
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
};
export default ApplyTable;
