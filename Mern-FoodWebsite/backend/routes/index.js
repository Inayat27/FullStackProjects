const express = require('express');
require('dotenv').config();
const router = express.Router();
const authRoutes = require('./auth');
const userRoutes = require('./user');


router.use("/auth",authRoutes);
router.use("/user",userRoutes);

module.exports = router;



 