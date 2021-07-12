const speakeasy = require('speakeasy');
const User = require('../../models/user');

async function validateToken (req, resp, next) {
    try {
        const { userId, token } = req.body;
        if(!userId || !token) {
            throw Error('User id and token required');
        }

        const user = await User.findById(userId);
        if (!user) {
            throw Error('User does not exists');
        }

        const { base32: secret } = user.secret;
        const validated = speakeasy.totp.verify({
            secret,
            encoding: 'base32',
            token
        });
        if (validated) {
            req.locals = {
                user
            };
            next();
        } else {
            const responseData = {
                success: false
            };
            resp.json(responseData);
        }
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: error.message });
    }
}

module.exports = validateToken;