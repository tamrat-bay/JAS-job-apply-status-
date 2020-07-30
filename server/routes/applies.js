const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const Apply = require('../models/Apply');
const User = require('../models/User');


router.get('/:userId', verifyToken, (req, res) => {
    const { userId } = req.params;
    User.findOne({ _id: userId }).populate('applies').exec(function (err, user) {
        if (err) return res.status(500).send(`server problem - ${err}`);
        res.status(200).send(user.applies);
    });
});


router.post('/:userId', verifyToken, (req, res) => {
    const newApply = {
        company,
        location,
        companySize,
        status,
        cvversion,
        jobDescription,
        isAnswered,
        date
    } = req.body
    const { userId } = req.params;
    Apply.create( newApply , function (err, apply) {
        if (err) return res.status(500).send(`server problem - ${err}`);
        User.findOne({ _id: userId }, function (err, foundUser) {
            if (err) return res.status(404).send(err);
            foundUser.applies.push(apply);
            foundUser.save(function (err, data) {
                if (err) return res.status(500).send(`server problem - ${err}`);
                return res.status(201).send(apply);
            });
        });
    });
});


router.put('/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    Apply.findByIdAndUpdate(id, req.body, { new: true })
        .then(response => {
            res.status(200).send(response); console.log(response, 'db response');
        })
        .catch(err => { console.log(err); res.status(500).send(`server problem - ${err}`) })
});


router.delete('/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    Apply.findByIdAndRemove(id)
        .then(response => res.status(200).send('Deleted'))
        .catch(err => { console.log(err); res.status(500).send(`server problem - ${err}`) })
});

module.exports = router;