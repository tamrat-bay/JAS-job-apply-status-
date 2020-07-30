import React, { memo } from 'react';
import { useObserver } from "mobx-react";
import { useJasStore } from "../../context/JasStoreContext";

const TableRowData = (props) => {

    const {
        job,
        getMoreDetails,
    } = props;
    const jasStore = useJasStore();

    const handleUpdate = (job) => {
        jasStore.setSingleApplyData(job);
        jasStore.setUpdateFlag();
    };

    const handleDelete = (job) => {
        jasStore.setSingleApplyData(job);
        jasStore.setDeleteFlag();
    };

    return useObserver(() =>
        <tr>
            <td>{job.date}</td>
            <td>{job.company}</td>
            <td>{job.status.current}</td>
            <td >
                <div className='ApplyTable-updateDelete'>
                    <span className='ApplyTable-updateIcon' onClick={() => handleUpdate(job)}>
                        <i className="fas fa-edit" style={{ color: '#6abbff' }}></i>
                    </span>
                    <span>
                        |
                </span>
                    <span className='ApplyTable-deleteIcon' onClick={() => handleDelete(job)}>
                        <i className="fas fa-trash-alt" style={{ color: '#dd4646' }}></i>
                    </span>
                </div>
            </td>
            <td className='ApplyTable-moreDetails' onClick={() => getMoreDetails(job)}>
                More Details
            </td>
        </tr>
    );
};
export default memo(TableRowData);