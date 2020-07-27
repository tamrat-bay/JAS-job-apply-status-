const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const appliesRouter = require('./routes/applies');
const authenticationRouter = require('./routes/authentication');
const forgotPasswordRouter = require('./routes/forgotPassword');


app.use(express.json());

//database
mongoose.connect('mongodb://localhost:27017/jas', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('MongoDb is Connected'))
    .catch((err) => console.log(err));


//routes
app.use('/jobapply', appliesRouter);
app.use('/users', authenticationRouter);
app.use('/forgotPassword', forgotPasswordRouter);


//deployment
if (process.env.NODE_ENV === 'production') {
    const root = path.join(__dirname, '..', 'client', 'build');
    app.use(express.static(root));
    app.get('*', (req, res) => {
        res.sendFile('index.html', { root });
    });
};

app.listen(PORT, () => console.log('app is listening on port: ' + PORT));