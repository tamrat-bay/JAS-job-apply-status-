const mongoose = require('mongoose');

const ResetRequestSchema = new mongoose.Schema({
    id: String,
    email: String,
}, { timestamps: true });
module.exports = mongoose.model('ResetRequest', ResetRequestSchema);