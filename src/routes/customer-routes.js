const driverController = require('../controllers/driverController');
const locationController = require('../controllers/locationController');

const router = require('express').Router();


router.get('/location', locationController.getAllLocation)
router.get('/filter', driverController.filterDriver)
router.get('/driver-seat/:driverID', driverController.getDriverSeat)
module.exports = router;
