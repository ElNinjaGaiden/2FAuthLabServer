const { Router } = require('express');
const router = Router();
const accessRouter = require('./services/access/router');
const languagesRouter = require('./services/languages/router');
const usersRouter = require('./services/users/router');

router.get('/health-check', (req, resp) => {
    resp.json({ success: true });
});
router.use('/access', accessRouter);
router.use('/languages', languagesRouter);
router.use('/users', usersRouter);

module.exports = router;