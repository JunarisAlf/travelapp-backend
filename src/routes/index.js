const router = require('express').Router();
const errorMiddleware = require('../middleware/errorMiddleware')
const adminRoutes = require('./admin-routes')
const customerRoutes = require('./customer-routes')
const driverRoutes = require('./driver-routes')

router.get('/', (req, res)=> {
    res.send('HOME')
});

router.use( '/admin', adminRoutes);
router.use('/customer', customerRoutes);
router.use('/driver', driverRoutes);

router.use(errorMiddleware)

module.exports = router