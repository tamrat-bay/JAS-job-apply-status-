const mongoose = require('mongoose');

const applySchema = new mongoose.Schema({
    date: {type:Date, default: Date.now},
    company:String,
    product:String,
    status: String,
    cvversion:String,
    tech:String,
    isAnswered:Boolean
});

const Apply = mongoose.model('apply',applySchema);

module.exports.Apply =  Apply;