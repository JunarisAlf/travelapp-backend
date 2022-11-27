const router = require('express').Router();
const adminController = require('../controllers/adminController');
const driverController = require('../controllers/driverController');
const locationController = require('../controllers/locationController');

const adminMiddleware = require('../middleware/adminMiddleware');

router.post('/login', adminController.login);
router.use(adminMiddleware);
router.get('/', adminController.getAdmin); //get admin data
router.put('/', adminController.updateAdmin); //update data admin

// driver
router.post('/driver', driverController.createDriver); //create driver
router.put('/driver/password/:driverID', driverController.updatePassword); //update password driver by admin
router.put('/driver/:driverID', driverController.updateDriver); //update driver
router.delete('/driver/:driverID', driverController.deleteDriver); //delete driver
router.get('/driver', driverController.getAllDriver); //get all driver
router.get('/driver/:driverID', driverController.getOneDriver); //get one driver
router.get('/driver-seat/:driverID', driverController.getDriverSeat); //get  driver seat
router.put('/driver-seat/:driverID', driverController.updateSeat)
router.get('/filter', driverController.filterDriver); //filter  driver seat


// location
router.post('/location', locationController.createLocation); //create location
router.put('/location/:locID', locationController.updateLocation); //Update location
router.get('/location/search', locationController.searchLoc); //getOne location
router.get('/location', locationController.getAllLocation); //getAll location
router.get('/location/:locID', locationController.getOneLocation); //getAll location

router.delete('/location/:locID', locationController.deleteLocation); //delete location

module.exports = router;
