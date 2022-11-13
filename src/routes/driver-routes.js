const router = require('express').Router();
const driverController = require('../controllers/driverController')

router.post('/masuk', driverController.login) //driver login


module.exports = router;
