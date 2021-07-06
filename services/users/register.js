const speakeasy = require('speakeasy');
const User = require('../../models/user');

async function register (req, resp) {
    try {
        const { userName, password } = req.body;
        if(!userName || !password) {
            throw Error('User name and password required');
        }

        const currentUser = await User.findOne({ userName });
        if (currentUser) {
            throw Error('User name already in use');
        }

        const tmpSecret = speakeasy.generateSecret();
        const user = await User.create({
            userName,
            password,
            tmpSecret
        });
        const responseData = {
            success: true,
            data: {
                userId: user._id,
                secret: tmpSecret.base32,
                otpAuthUrl: tmpSecret.otpauth_url
            }
        };
        resp.json(responseData);
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: error.message });
    }
};

module.exports = register;