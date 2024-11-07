const express = require('express');
const isAuthorized = require('../Middleware/authenticate');


const router = express.Router();


router.get('/profile',isAuthorized,(req,res) =>
{
    res.json({
        userId:req.userId
    })
})


module.exports = router;