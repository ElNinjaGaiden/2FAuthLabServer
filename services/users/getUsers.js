const User = require('../../models/user');

async function getUsers (req, resp) {
    try {
        const users = await User.find({}).lean();
        const responseData = {
            success: true,
            data: users.map(u => {
                u.twoFactorAuhtEnabled = !!u.secret;
                u.password = undefined;
                u.secret = undefined;
                u.__v = undefined;
                return u;
            })
        };
        resp.json(responseData);
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: error.message });
    }
}

module.exports = getUsers;