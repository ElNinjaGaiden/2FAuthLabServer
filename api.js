const { Router } = require('express');
const router = Router();
const usersRouter = require('./services/users/router');
const languagesRouter = require('./services/languages/router');

router.get('/health-check', (req, resp) => {
    resp.json({ success: true });
});
router.use('/users', usersRouter);
router.use('/languages', languagesRouter);

module.exports = router;