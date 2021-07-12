const { Router } = require('express');
const router = Router();
const getUsers = require('../users/getUsers');

router.get('/', getUsers);

module.exports = router;