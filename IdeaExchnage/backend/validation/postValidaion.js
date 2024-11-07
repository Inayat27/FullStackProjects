const zod = require('zod');

const postValidationSchema = zod.object({
    title:zod.string(),
    description:zod.string()

})

module.exports = {postValidationSchema}