const Language = require('../../models/language');

async function getLanguages (req, resp) {
    try {
        const responseData = {
            success: true,
            data: await Language.find({})
        };
        resp.json(responseData);
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: error.message });
    }
}

module.exports = getLanguages;
