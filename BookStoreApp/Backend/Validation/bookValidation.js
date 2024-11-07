

const zod = require('zod');


const bookValidationSchema = zod.object({
    author : zod.string(),
    description : zod.string(),
    price : zod.number(),
    image : zod.string(),
    isavailable:zod.boolean()
})



module.exports = bookValidationSchema