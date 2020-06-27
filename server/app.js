const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const { VerifyToken } = require('./modules/VerifyToken');
const ApplyHelper = require('./modules/ApplyHelper');
const ForgotPassword = require('./modules/ForgotPassword');
const Authentication = require('./modules/Authentication');


app.use(express.json());

mongoose.connect('mongodb://localhost:27017/jas', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('MongoDb is Connected'))
    .catch((err) => console.log(err));


//jobapply
app.get('/jobapply/:userId', VerifyToken, (req, res) => {
    return ApplyHelper.getApplyHandler(req, res);
});

app.post('/jobapply/:userId', VerifyToken, (req, res) => {
    return ApplyHelper.postApplyHandler(req, res);
});

app.put('/jobapply/:id', VerifyToken, (req, res) => {
    return ApplyHelper.updateApplyHandler(req, res);
});

app.delete('/jobapply/:id', VerifyToken, (req, res) => {
    return ApplyHelper.deleteApplyHandler(req, res);
});

//Authentication
app.post('/users/register', (req, res) => {
    return Authentication.register(req, res);
});

app.post('/users/login', (req, res) => {
    return Authentication.login(req, res);
});

//forgot password
app.post('/forgotPassword/:email', (req, res) => {
    return ForgotPassword.forgotPassword(req, res);
});

//Reset password
app.patch('/reset', (req, res) => {
    return ForgotPassword.resetPassword(req, res);
});


//deployment
if (process.env.NODE_ENV === 'production') {
    const root = path.join(__dirname, '..', 'client', 'build');
    app.use(express.static(root));
    app.get('*', (req, res) => {
        res.sendFile('index.html', { root });
    });
};

app.listen(port, () => console.log('app is listening on port: ' + port));