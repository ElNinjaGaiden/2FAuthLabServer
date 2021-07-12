const { Router } = require('express');
const router = Router();
const getUsers = require('../users/getUsers');
const authenticatedRequest = require('../../middleware/authenticatedRequest');

router.get('/', authenticatedRequest, getUsers);

module.exports = router;