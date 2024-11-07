const zod = require('zod');

const userValidate = zod.object({
    fullname:zod.string(),
    email:zod.string().email(),
    password:zod.string().min(6)
})


const userVerification = zod.object({
    email:zod.string().email(),
    password:zod.string().min(6)
})


module.exports = { userValidate, userVerification }