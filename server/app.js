const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
// const PublicPath = path.join(__dirname, '..', 'public');
const port = 5000;
const ApplyHelper = require('./ApplyHelper')

app.use(express.json());
// app.use(express.static(PublicPath));

mongoose.connect('mongodb://localhost:27017/jas', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('MongoDb is Connected'))
    .catch((err) => console.log(err));






app.post('/jobapply', (req, res) => {
    console.log(req.body);
    return ApplyHelper.postApplyHandler(req, res);
});

app.get('/jobapply', (req, res) => {
    return ApplyHelper.getApplyHandler(req, res);
});

app.put('/jobapply/:id', (req, res) => {
    return ApplyHelper.updateApplyHandler(req, res);
});

app.delete('/jobapply/:id', (req, res) => {
    return ApplyHelper.deleteApplyHandler(req, res);
});

app.listen(port, () => console.log('app is listening on port ' + port))





