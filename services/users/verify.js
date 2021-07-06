const speakeasy = require('speakeasy');
const User = require('../../models/user');

async function verify (req, resp) {
    try {
        const { userId, token } = req.body;
        if(!userId || !token) {
            throw Error('User id and token required');
        }

        const user = await User.findById(userId);
        if (!user) {
            throw Error('User does not exists');
        }

        const { base32: secret } = user.tmpSecret;
        const verified = speakeasy.totp.verify({
            secret,
            encoding: 'base32',
            token
        });

        const responseData = {
            success: true
        };

        if(verified) {
            // Update user data
            user.secret = Object.assign({}, user.tmpSecret);
            user.tmpSecret = undefined;
            await user.save();
        } else {
            responseData.success = false;
        }

        resp.json(responseData);
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: error.message });
    }
}

module.exports = verify;