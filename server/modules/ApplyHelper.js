const mongoose = require('mongoose');
const { Apply } = require('../models/applyModel');
const User = require('../models/User');


// const getApplyHandler = (req, res) => {
//     return Apply.find({})
//         .then(response => res.status(200).send(response))
//         .catch(err => { console.log(err); res.status(500).send(`server problem - ${err}`) })
// }


//new version
const getApplyHandler = (req, res) => {
    const { userId } = req.params;
    User.findOne({ _id: userId }).populate('applies').exec(function (err, user) {
        if (err) return res.status(500).send(`server problem - ${err}`);
        return res.status(200).send(user.applies);
    });
};


// const postApplyHandler = (req, res) => {
//     const { company, location, companySize, status, cvversion, jobDescription, isAnswered } = req.body
//     //todo-- need to Add Validation
//     const apply = new Apply({
//         company,
//         location,
//         companySize,
//         status,
//         cvversion,
//         jobDescription,
//         isAnswered
//     });
//     return apply.save()
//         .then(response => res.status(201).send(response))
//         .catch(err => { console.log(err); res.status(500).send(`server problem - ${err}`) })
// }

//new version
const postApplyHandler = (req, res) => {
    const { company, location, companySize, status, cvversion, jobDescription, isAnswered } = req.body
    const { userId } = req.params;
    //todo-- need to Add Validation
    Apply.create({
        company,
        location,
        companySize,
        status,
        cvversion,
        jobDescription,
        isAnswered
    }, function (err, apply) {
        if (err) return res.status(500).send(`server problem - ${err}`);
        User.findOne({ _id: userId }, function (err, foundUser) {
            if (err) return res.status(404).send(err);
            foundUser.applies.push(apply);
            foundUser.save(function (err, data) {
                if (err) return res.status(500).send(`server problem - ${err}`);
                return res.status(201).send(data);
            })
        })
    });
};




const updateApplyHandler = (req, res) => {
    const { id } = req.params;
    return Apply.findByIdAndUpdate(id, req.body, { new: true })
        .then(response => {
            res.status(200).send(response); console.log(response, 'db response');
        })
        .catch(err => { console.log(err); res.status(500).send(`server problem - ${err}`) })
};

const deleteApplyHandler = (req, res) => {
    const { id } = req.params;
    return Apply.findOneAndDelete(id)
        .then(response => res.status(200).send('Deleted'))
        .catch(err => { console.log(err); res.status(500).send(`server problem - ${err}`) })
};


module.exports.getApplyHandler = getApplyHandler;
module.exports.postApplyHandler = postApplyHandler;
module.exports.updateApplyHandler = updateApplyHandler;
module.exports.deleteApplyHandler = deleteApplyHandler;