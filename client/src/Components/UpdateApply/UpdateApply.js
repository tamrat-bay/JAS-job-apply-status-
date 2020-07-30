import React from 'react';
import ApplyForm from '../ApplyForm/ApplyForm';
import { useJasStore } from "../../context/JasStoreContext";

const UpdateApply = (props) => {

    const jasStore  = useJasStore();
    const axiosInfo = {
        method: 'put',
        url: `/jobapply/${jasStore.singleApplyData._id}`,
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.jas_login).token}` },
        resolveFunction: jasStore.updateApply
    };

    return <ApplyForm
        title='Update'
        axiosInfo={axiosInfo}
        closeMe={jasStore.setUpdateFlag}
    />;
};
export default UpdateApply;
