const zod = require('zod');

const signpValidate = zod.object({
    fullname:zod.string(),
    email:zod.string().email(),
    password:zod.string().min(6)
})



const loginValidate = 
    zod.object({
        
        email:zod.string().email(),
        password:zod.string().min(6)
    })


    module.exports= {signpValidate,loginValidate}