import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import NewApply from '../NewApply/NewApply';
import UpdateApply from '../UpdateApply/UpdateApply';
import MoreDetails from '../MoreDetails/MoreDetails';
import SearchBar from '../SearchBar/SearchBar';
import TableRowData from './TableRowData';
import useToggle from '../hooks/useToggleState'
import './ApplyTable.css';
import axios from 'axios';

function ApplyTable() {
    const [jobApplies, setJobApplies] = useState([{ status: {} }]);
    const [filterdApplies, setFilterdApplies] = useState([{ status: {} }]);

    const [singleApplyData, setSingleApplyData] = useState({ status: { current: '' } });

    const [filterFlag, setFilterFlag] = useToggle(false)
    const [addNewFlag, setAddNewFlag] = useToggle(false)
    const [updateFlag, setUpdateFlag] = useToggle(false)
    const [deleteFlag, setDeleteFlag] = useToggle(false)
    const [moreDetailsFlag, setMoreDetailsFlag] = useToggle(false)

    //    let singleApplyData = {}
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
                    console.log('jobApplies'.toLocaleUpperCase());
                    console.log(res.data);
                    setJobApplies(res.data)
                }
            })
            .catch(error =>
                console.log(error.response.data)
            );
    }, []);

    const closeAddNewApplyPopup = () => {
        setAddNewFlag()
    }

    const closeUpdateApplyPopup = () => {
        setUpdateFlag()
    }

    const displayFilterdData = (filtData) => {
        // console.log('filtData', filtData);

        setFilterdApplies(filtData)
        setFilterFlag()
    }
    const newApplyAdded = (data) => {
        const temp = jobApplies;
        temp.push(data);
        setJobApplies(temp)
        setAddNewFlag()
    }

    const updateApply = (data, i) => {
        let temp = [...jobApplies];
        temp[i] = { ...data };
        setJobApplies(temp)
        setUpdateFlag()
    }

    const deleteApply = () => {
        const { id, index } = singleApplyData;
        axios.delete(`/jobapply/${id}`, {
        })
            .then(res => {
                if (res.status === 200) {
                    const temp = jobApplies;
                    temp.splice(index, 1)
                    setJobApplies(temp)
                    setDeleteFlag()
                }
            })
            .catch(err => console.log(err))
    }


    const getMoreDetails = (singleApplyObj) => {
        //    console.log(singleApplyObj,'more details');
        setSingleApplyData(singleApplyObj);
        console.log(singleApplyData, 'more details');

        setMoreDetailsFlag();

    }

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

            <SearchBar jobApplies={jobApplies} displayFilterdData={displayFilterdData} />

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
}

export default ApplyTable
