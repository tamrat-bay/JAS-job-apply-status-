import React from 'react';

const TableRowData = (props) => {

    const {
        job,
        setDeleteFlag,
        setUpdateFlag,
        getMoreDetails,
        setSingleApplyData
    } = props;

    const handleUpdate = (job) => {
        setSingleApplyData(job);
        setUpdateFlag();
    };

    const handleDelete = (job) => {
        setSingleApplyData(job);
        setDeleteFlag();
    };

    // console.log(job);
    

    return (
        <tr>
            <td>{job.date}</td>
            <td>{job.company}</td>
            <td>{job.status.current}</td>
            <td>
                <span className='ApplyTable-updateIcon' onClick={() => handleUpdate(job)}>
                    <span role="img" aria-label="handwrite"> ✍ </span>
                    <span> Update </span>
                </span>
                <span style={{ margin: '0 10px' }}>|</span>
                <span className='ApplyTable-deleteIcon' onClick={() => handleDelete(job)}>
                    <span role="img" aria-label="sciccors"> ✂ </span>
                    <span> Delete </span>
                </span>
            </td>
            <td onClick={() => getMoreDetails(job)}>More Details</td>
        </tr>
    )



    // return (
    //     <tr >
    //         <td>{job.date}</td>
    //         <td>{job.company}</td>
    //         <td>{job.status.current}</td>
    //         <td> <span onClick={() => {
    //             let applyInfo = { ...job, index };
    //             setSingleApplyData(applyInfo);

    //             setUpdateFlag();
    //         }}>
    //             <span role="img" aria-label="handwrite">✍</span> Update </span>
    //             | <span onClick={() => {
    //                 setDeleteFlag();
    //                 setSingleApplyData(job);
    //             }}>
    //                 <span role="img" aria-label="sciccors">✂</span> Delete </span>
    //         </td>
    //         <td onClick={() => { getMoreDetails(job) }}>More Details</td>
    //     </tr>
    // )
};
export default TableRowData;
