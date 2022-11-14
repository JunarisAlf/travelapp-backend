const driverController = require('../controllers/driverController');

const router = require('express').Router();

router.get('/filter', driverController.filterDriver)
module.exports = router;
