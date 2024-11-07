const userModel = require('../models/user');
const {hashedPassword,comaprePassword} = require('../helper/auth')

const jwt = require('jsonwebtoken')

const test = (req,res) =>
{
    res.send('Hello')
}

const registerUser = async (req,res) =>
{
   const registerData = req.body;
   const {name,email,password} = req.body
   

   try {
    if(!name)
    {
        console.log('hh');
     return res.json({
         error:'Name is Required'
     })
    }
    if (!password || password.length < 6) {
        return res.json({
            error:'Password SHould be greater than 6 character'
        })
    }
    
    //check mail
    const exists = await userModel.findOne({email:registerData.email})
    if(exists){
        return res.json({
            error:'Email is already Taken'
        })
    }

    const hashpassword = await hashedPassword(registerData.password)

    const response = await userModel.create({
        name:registerData.name,
        email:registerData.email,
        password:hashpassword
    })

    
    return res.json(response)
    


   } catch (error) {
    console.log(error);
   }
}
  


const loginUser = async (req,res) =>
{
    const userData = req.body

    try {
        const user = await userModel.findOne({email:userData.email})

       

        if (!user) {
            return res.json({
                error :'No User Found'
            })
        }

        const match = await comaprePassword(userData.password,user.password)
      
        if(match)
        {
           jwt.sign({email:user.email,id:user._id,name:user.name},process.env.SECRET_KEY,{},(err,token) =>
           {
            if (err) throw err;
            res.cookie('token',token).json(user)
           })
        }
        if (!match) {
            res.json({
                error:'Password do not matched'
            })
        }
    } catch (error) {
        console.log(error);
        
    }
}



const getProfile = (req,res) =>
{
    const {token} = req.cookies
    // console.log(token);
    if (token) {
    jwt.verify (token, process.env.SECRET_KEY, {}, (err, user) => {
    if(err) throw err;
    res.json (user)
    })
    } else {
    res.json (null)
    }
    
}
module.exports = {test, registerUser,loginUser,getProfile};