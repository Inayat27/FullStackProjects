const zod = require("zod");

const validateUserSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(6),
});

const validateUserLoginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});

module.exports = { validateUserLoginSchema, validateUserSchema };
