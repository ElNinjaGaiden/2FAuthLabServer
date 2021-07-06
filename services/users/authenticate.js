const User = require('../../models/user');

async function authenticate (req, resp) {
    try {
        const { userName, password } = req.body;
        if(!userName || !password) {
            throw Error('User name and password required');
        }

        const user = await User.findOne({ userName });
        if (!user) {
            throw Error('User does not exists');
        }

        const { password: storedPassword } = user;
        const responseData = {
            success: true
        };
        if (password === storedPassword) {
            responseData.data = {
                userId: user._id
            };
        } else {
            responseData.success = false
        }
        resp.json(responseData);
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: error.message });
    }
}

module.exports = authenticate;
