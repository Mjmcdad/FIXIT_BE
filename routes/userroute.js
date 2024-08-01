const express = require('express');
const router =  express.Router();
const usercontroller = require('../controllers/usercontroller');

router.post('/', usercontroller.create)
router.post('/login', usercontroller.logIn)



module.exports = router