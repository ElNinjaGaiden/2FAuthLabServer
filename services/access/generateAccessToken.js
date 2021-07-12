const jwt = require('jsonwebtoken');
const AccessToken = require('../../models/accessToken');

async function generateAccessToken(req, resp) {
    try {
        const { JWT_SECRET_KEY: jwtSecret } = process.env;
        if (!jwtSecret)
            throw Error('JWT secret required');

        const { locals: { user } } = req;
        if (!user)
            throw Error('User required to create access token');

        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setMinutes(today.getMinutes() + 30);

        const _jwt = jwt.sign({
            email: user.userName,
            id: user._id,
            exp: parseInt((expirationDate.getTime() / 1000).toString(), 10),
        }, jwtSecret);
        const accessToken = await AccessToken.create({
            user: user._id,
            jwt: _jwt,
            expirationDate
        });
        const responseData = {
            success: true,
            accessToken
        };
        resp.json(responseData);
    } catch (ex) {
        console.error(ex);
        resp.status(500).json({ message: error.message });
    }
}

module.exports = generateAccessToken;

