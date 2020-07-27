const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    applies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apply'
    }]
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);