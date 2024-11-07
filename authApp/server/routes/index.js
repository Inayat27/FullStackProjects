const express = require('express');

const router = express.Router();
const userRoutes = require('./user')
const AuthRoutes = require('./auth')

router.use('/user',userRoutes)
router.use('/auth',AuthRoutes)
module.exports = router;