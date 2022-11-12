const router = require('express').Router();

router.post('/sign-up', (req, res)=> {
    res.send('ok')
});

router.use(errorMiddleware)

module.exports = router