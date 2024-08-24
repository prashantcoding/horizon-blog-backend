const express = require('express');
const router = express.Router();
const user=require('../Model/userModel');
const { login, signup } = require('../Controller/userController');
// Import controller functions or handlers


router.post('/signup',signup)
router.post('/login',login)
router.get('/getcurrentuser')

module.exports = router;