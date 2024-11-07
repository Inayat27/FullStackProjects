const userRoutes = require('./user');
const authRoutes = require('./auth');
const postRoutes = require('./post')
const express = require('express');
const router =  express.Router();


router.use('/auth',authRoutes);
router.use('/user',userRoutes);
router.use('/post',userRoutes);


module.exports= router;