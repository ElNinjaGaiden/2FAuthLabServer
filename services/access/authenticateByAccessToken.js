const AccessToken = require('../../models/accessToken');

async function authenticateByAccessToken (req, resp) {
    try {
        const { userId, accessToken } = req.body;
        if(!userId || !accessToken) {
            throw Error('User id and access token required');
        }

        const response = {
            success: true,
        };
        const _accessToken = await AccessToken.findOne({ user: userId, jwt: accessToken }).populate('user');
        if (_accessToken) {
            const { expirationDate, user } = _accessToken;
            const now = new Date();
            if (now < expirationDate) {
                user.password = undefined;
                response.data = user;
            } else {
                response.success = false;
            }
        } else {
            response.success = false;
        }
        resp.json(response);
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: error.message });
    }
}

module.exports = authenticateByAccessToken;