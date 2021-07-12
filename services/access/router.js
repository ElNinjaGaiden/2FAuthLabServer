const { Router } = require('express');
const router = Router();
const register = require('./register');
const verify = require('./verify');
const validateToken = require('./validateToken');
const authenticate = require('./authenticate');
const authenticateByAccessToken = require('./authenticateByAccessToken');
const generateAccessToken = require('./generateAccessToken');

router.post('/register', register);
router.post('/authenticate', authenticate);
router.post('/authenticateByToken', authenticateByAccessToken);
router.post('/verify', verify, generateAccessToken);
router.post('/validateToken', validateToken, generateAccessToken);

module.exports = router;