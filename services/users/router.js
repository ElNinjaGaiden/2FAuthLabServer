const { Router } = require('express');
const router = Router();
const register = require('./register');
const verify = require('./verify');
const validateToken = require('./validateToken');
const authenticate = require('./authenticate');

router.post('/register', register);
router.post('/verify', verify);
router.post('/authenticate', authenticate);
router.post('/validateToken', validateToken);

module.exports = router;