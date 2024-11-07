const express = require('express');
const { signUp, login } = require('../controller/auth');
require('dotenv').config();
const router = express.Router();



// signUP route
router.post('/signup',signUp);
router.post('/login',login)


module.exports = router