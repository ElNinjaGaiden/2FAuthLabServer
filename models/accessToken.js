const mongoose = require('mongoose');

const AccessTokenScheme = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    jwt: {
        required: true,
        type: String
    },
    expirationDate: {
        required: true,
        type: Date
    }
});

const AccessToken = mongoose.model('AccessToken', AccessTokenScheme, 'accessTokens');
module.exports = AccessToken;