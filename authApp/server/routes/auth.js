const express = require('express');
const {userValidate , userVerification} =require('../validation/userValidationSchema');
const { User } = require('../db/userdb');
const zod= require('zod')
const jwt = require('jsonwebtoken')



const router = express.Router();

// used to register as user
router.post('/signup', async(req,res) =>
{
    const payload = req.body;
   const Parsedpayload = userValidate.safeParse(payload);
   if (!Parsedpayload.success) {
    return  res.json({
        msg:'Invalid input'
    })
   } 

   const isExist =await  User.findOne({fullname:payload.fullname});
   if (isExist) {
    return res.json({
        msg:'User already exists'
    })
   }

   try {
    User.create({
        fullname:payload.fullname,
        email:payload.email,
        password:payload.password
    })
    .then((r) =>
    {
        return res.json({
            msg:'User created Successfully'
        })

    })

   } catch (error) {
    return res.json({
        msg:'Error while creationg the user'
    })
   }

})



// user signin routes check for the existing user


router.post('/signin',async (req,res) =>
{
    const loginCredentials=  req.body;

    const isVerified= userVerification.safeParse(loginCredentials);

    if (!isVerified.success) {
        return res.json({
            msg:'Inavlid Input'
        })
    }

    try {

        const userExists = await User.findOne({
            email:loginCredentials.email
        })

        
        if (!userExists) {
            return res.json({})
        }
  
      
        const isMatched = await userExists.comparePassword(loginCredentials.password)

        if (!isMatched) {
            return res.json({
                msg:'User Not Found'
            })
        }
    
        const token = jwt.sign({userId:userExists._id},process.env.SECRET_KEY,{expiresIn:'2 hours'});

        return res.json({
            msg:'User Login Successfull',
            token:token
        })


        
    } catch (error) {
        return res.json({
            msg:'Error Occured while looking for the User!'
        })
    }
})


module.exports = router;