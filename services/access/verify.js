const speakeasy = require('speakeasy');
const User = require('../../models/user');

async function verify (req, resp, next) {
    try {
        const { userId, token } = req.body;
        if(!userId || !token) {
            throw Error('User id and token required');
        }

        const user = await User.findById(userId);
        if (!user) {
            throw Error('User does not exists');
        }

        const { tmpSecret, secret } = user;
        if (tmpSecret && !secret) {
            const { base32: secret } = user.tmpSecret;
            const verified = speakeasy.totp.verify({
                secret,
                encoding: 'base32',
                token
            });
            if(verified) {
                // Update user data
                user.secret = Object.assign({}, user.tmpSecret);
                user.tmpSecret = undefined;
                await user.save();
                req.locals = {
                    user
                };
                next()
            } else {
                const responseData = {
                    success: false
                };
                resp.json(responseData);
            }
        } else {
            // User has verified his secret/token previously, lets use the persisted 'secret' instead of the tm secret
            const { base32 } = secret;
            const validated = speakeasy.totp.verify({
                base32,
                encoding: 'base32',
                token
            });
            if (validated) {
                req.locals = {
                    user
                };
                next()
            } else {
                const responseData = {
                    success: false
                };
                resp.json(responseData);
            }
        }
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: error.message });
    }
}

module.exports = verify;