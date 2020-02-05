const mongoose = require('mongoose');

const applySchema = new mongoose.Schema({
    date: {type:String, default: new Date().toDateString()},
    company:String,
    location:String,
    product:String,
    status: String,
    cvversion:String,
    tech:String,
    isAnswered:Boolean
});

//todo Add Contact Name- And phone and Position
//todo When contact was created
//todo Startup Or Big Company
//todo Staus select with option - HR int / HomeWork / Tel-Int / Tech-Int / Signin- contract / hierd/
//todo Comment 
//! Search by compny name / do Answerd / by status /



const Apply = mongoose.model('apply',applySchema);

module.exports.Apply =  Apply;