const express = require('express');
const router = express.Router();
const usercontroller = require('../Controllers/UserControll')


router.post('/signup',usercontroller.signup);
router.post('/login',usercontroller.login);
router.post('/forgotpassword',usercontroller.forgotpassword);
router.post('/resetpassword/:id/:token',usercontroller.resetpassword);
module.exports= router