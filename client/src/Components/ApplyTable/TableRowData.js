import React, { memo } from 'react';

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


    return (
        <tr>
            <td>{job.date}</td>
            <td>{job.company}</td>
            <td>{job.status.current}</td>
            <td className='ApplyTable-updateDelete'>
                <span className='ApplyTable-updateIcon' onClick={() => handleUpdate(job)}>
                    <span role="img" aria-label="handwrite">✍</span>
                    <span>Update</span>
                </span>
                <span>|</span>
                <span className='ApplyTable-deleteIcon' onClick={() => handleDelete(job)}>
                    <span role="img" aria-label="sciccors">✂</span>
                    <span>Delete</span>
                </span>
            </td>
            <td className='ApplyTable-moreDetails' onClick={() => getMoreDetails(job)}>
                More Details
            </td>
        </tr>
    )
};
export default memo(TableRowData);
