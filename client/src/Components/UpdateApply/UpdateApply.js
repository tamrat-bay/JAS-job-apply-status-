import React from 'react';
import ApplyForm from '../ApplyForm/ApplyForm';
import './UpdateApply.css'


const UpdateApply = (props) => {

    const { initialValues, closeMe, updateApply } = props;
    const axiosInfo = {
        method: 'put',
        url: `/jobapply/${initialValues._id}`,
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.jas_login).token}` },
        resolveFunction: updateApply
    };

    // console.log(initialValues);


    return <ApplyForm
        title='Update'
        CssClass='UpdateApply'
        initialValues={initialValues}
        axiosInfo={axiosInfo}
        closeMe={closeMe}
    />;
};
export default UpdateApply;
