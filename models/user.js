const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tmpSecret: Object,
    secret: Object
});

const User = mongoose.model('User', UserScheme, 'users');
module.exports = User;