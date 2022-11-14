const router = require('express').Router();
const driverMiddleware = require('../middleware/driverMiddleware')
const driverController = require('../controllers/driverController')
const utilsController = require('../controllers/utilsController')


router.post('/masuk', driverController.login) //driver login
router.use(driverMiddleware);
router.get('/data', driverController.getOneDriver) //get Driver data
router.put('/data', driverController.updateData)  //update data driver
router.put('/seat', driverController.updateSeat) //update seat driver
router.get('/options', utilsController.getOptions) //update seat driver



module.exports = router;
