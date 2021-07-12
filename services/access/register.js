const speakeasy = require('speakeasy');
const User = require('../../models/user');

async function register (req, resp) {
    try {
        const { userName, password, firstName, lastName } = req.body;
        if(!userName || !password || !firstName || !lastName) {
            throw Error('First name, last name, user name and password required');
        }

        const currentUser = await User.findOne({ userName });
        if (currentUser) {
            throw Error('User already exists');
        }

        const tmpSecret = speakeasy.generateSecret({
            name: `2FactAuthLab (${userName})`
        });
        const user = await User.create({
            firstName,
            lastName,
            userName,
            password,
            tmpSecret
        });
        //Remove the password from the data response
        user.password = undefined;
        const responseData = {
            success: true,
            data: user
        };
        resp.json(responseData);
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: error.message });
    }
};

module.exports = register;