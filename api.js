const { Router } = require('express');
const router = Router();
const usersRouter = require('./services/users/router');

router.get('/health-check', (req, resp) => {
    resp.json({ success: true });
});
router.use('/users', usersRouter);

module.exports = router;