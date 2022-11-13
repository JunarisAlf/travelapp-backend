const router = require('express').Router();
const driverMiddleware = require('../middleware/driverMiddleware')
const driverController = require('../controllers/driverController')

router.post('/masuk', driverController.login) //driver login
router.use(driverMiddleware);
router.get('/data', driverController.getOneDriver) //get Driver data
router.put('/data', driverController.updateData) 


module.exports = router;
