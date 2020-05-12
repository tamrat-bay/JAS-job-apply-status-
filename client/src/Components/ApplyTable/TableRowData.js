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
            <td >
              <div className='ApplyTable-updateDelete'>
                <span className='ApplyTable-updateIcon' onClick={() => handleUpdate(job)}>
                <i className="fas fa-edit" style={{color:'#6abbff'}}></i>
                </span>
                <span>
                    |
                </span>
                <span className='ApplyTable-deleteIcon' onClick={() => handleDelete(job)}>
                <i className="fas fa-trash-alt" style={{color:'#dd4646'}}></i>
                </span>
                </div>
            </td>
            <td className='ApplyTable-moreDetails' onClick={() => getMoreDetails(job)}>
                More Details
            </td>
        </tr>
    )
};
export default memo(TableRowData);
