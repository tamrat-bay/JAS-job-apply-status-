import React from 'react'

function TableRowData(props) {
    const { job, index, setDeleteFlag, setUpdateFlag, getMoreDetails, setSingleApplyData } = props


    return (
        <tr >
            <td>{job.date}</td>
            <td>{job.company}</td>
            <td>{job.status.current}</td>
            <td> <span onClick={() => {
                let applyInfo = { ...job, index: index };
                setSingleApplyData(applyInfo);

                setUpdateFlag()
            }}>
                <span role="img" aria-label="handwrite">✍</span> Update </span>
                | <span onClick={() => {
                    setDeleteFlag();
                    setSingleApplyData(job);
                }}>
                    <span role="img" aria-label="sciccors">✂</span> Delete </span>
            </td>
            <td onClick={() => { getMoreDetails(job) }}>More Details</td>
        </tr>
    )
}

export default TableRowData
