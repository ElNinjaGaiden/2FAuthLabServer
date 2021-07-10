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
        if (password === storedPassword) {
            user.password = undefined;
            const responseData = {
                success: true,
                data: user
            };
            resp.json(responseData);
        } else {
            throw Error('Password does not match');
        }
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: error.message });
    }
}

module.exports = authenticate;
