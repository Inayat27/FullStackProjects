const zod = require('zod');

const validateRecipeSchema = zod.object({
    title: zod.string(),
    ingredients: zod.string(),
    instructions: zod.string(),
    cookingTime: zod.number(),
    diffLevel: zod.string()
});


module.exports= validateRecipeSchema;