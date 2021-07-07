const { Router } = require('express');
const router = Router();
const getLanguages = require('./getLanguages');

router.get('/', getLanguages);

module.exports = router;