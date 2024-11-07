const express = require('express');

const router = express.Router();
const {authenticated} = require('../middleware/authenticatedUser')


router.get('/profile',authenticated, (req,res) =>{
    const user = req.user;
    if (!user) {
        return res.json({
            msg:'Please check your credentials'
        })
    }


    res.json(user)
   
})


module.exports = router