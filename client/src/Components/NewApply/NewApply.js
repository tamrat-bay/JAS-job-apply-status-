import React from 'react'
import ApplyForm from '../ApplyForm/ApplyForm';


const NewApply = (props) => {

    const newApply = {
        date: '',
        company: '',
        companySize: '',
        location: '',
        cvversion: '',
        jobDescription: '',
        isAnswered: false,
        status: {
            current: 'Pending',//! default value
            Pending: { contactName: '', contactPhone: '', contactPosition: '', statusDescription: '' },
            Assignment: { contactName: '', contactPhone: '', contactPosition: '', statusDescription: '' },
            "HR interview": { contactName: '', contactPhone: '', contactPosition: '', statusDescription: '' },
            "Phone interview": { contactName: '', contactPhone: '', contactPosition: '', statusDescription: '' },
            "Technical interview": { contactName: '', contactPhone: '', contactPosition: '', statusDescription: '' }
        },
    };

    const axiosInfo = {
        method: 'post',
        url: `/jobapply/${JSON.parse(localStorage.jas_login).id}`,
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.jas_login).token}` },
        resolveFunction: props.addNewApply
    };

    return <ApplyForm
        title='New'
        initialValues={newApply}
        axiosInfo={axiosInfo}
        closeMe={props.closeMe}
    />;
};
export default NewApply;