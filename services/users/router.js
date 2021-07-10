const { Router } = require('express');
const router = Router();
const register = require('./register');
const verify = require('./verify');
const validateToken = require('./validateToken');
const authenticate = require('./authenticate');
const getUsers = require('./getUsers');

router.post('/register', register);
router.post('/verify', verify);
router.post('/authenticate', authenticate);
router.post('/validateToken', validateToken);
router.get('/', getUsers);

module.exports = router;