const mongoose = require('mongoose');

const LanguageScheme = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

const User = mongoose.model('Language', LanguageScheme, 'languages');
module.exports = User;