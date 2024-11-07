const zod = require('zod');



const userValidation = zod.object({
    name:zod.string(),
    email:zod.string().email(),
    password:zod.string().min(5,'password  should be greater than 5 ')
})



const loginValidation = zod.object({
    email:zod.string().email(),
    password:zod.string().min(5,'password  should be greater than 5 ')
})


module.exports = {userValidation, loginValidation}