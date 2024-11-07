const express = require('express');
const { allFood, addFood, updateFood, deleteFood } = require('../controller/Food');
require('dotenv').config();
const router = express.Router();

const authenticate = require('../middleware/userAuthMiddleware')

//  fetch allFood
router.get('/allFood',allFood);

// add food
router.post('/addFood',authenticate ,addFood)

// update food

router.put('/updatefood/:id',authenticate,updateFood);

// delete food

router.delete('/deleteFood/:id',authenticate,deleteFood)





module.exports = router