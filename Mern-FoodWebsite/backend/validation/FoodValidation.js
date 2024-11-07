const z= require('zod')


const FoodInputValidation  = z.object({
    dishname:z.string(),
    price:z.number(),
    dishImage:z.string()

})


module.exports = FoodInputValidation