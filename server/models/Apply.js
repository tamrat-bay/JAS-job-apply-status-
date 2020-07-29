const mongoose = require('mongoose');

const applySchema = new mongoose.Schema({
    date: String,
    company: String,
    companySize: String,
    location: String,
    status: Object,
    cvversion: String,
    jobDescription: String,
    isAnswered: Boolean
});
module.exports = mongoose.model('Apply', applySchema);