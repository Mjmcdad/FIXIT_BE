const express = require('express');
const router =  express.Router();
const service_controller = require('../controllers/service_controller');

router.post('/', service_controller.create)
router.get('/', service_controller.index)



module.exports = router