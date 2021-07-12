const AccessToken = require('../models/accessToken');

async function authenticatedRequest (req, resp, next) {
    try {
        const { headers } = req;
        const userId = headers['x-user-id'];
        const authorization = headers['authorization'];
        if (userId && authorization) {
            const jwt = authorization.split(' ')[1];
            const accessToken = await AccessToken.findOne({ user: userId, jwt});
            if (accessToken) {
                next();
            } else {
                resp.sendStatus(401);
            }
        } else {
            resp.sendStatus(401);
        }
    } catch (ex) {
        console.error(ex);
        resp.status(500).json({ message: error.message });
    }
}

module.exports = authenticatedRequest;