const express = require('express');
const router =  express.Router();
const usercontroller = require('../controllers/usercontroller');

router.post('/', usercontroller.create)
router.get('/workers', usercontroller.get_workers)
router.post('/login', usercontroller.logIn)



module.exports = router