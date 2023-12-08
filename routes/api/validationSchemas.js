const Joi = require("joi");

const createContactSchema = Joi.object({
  query: Joi.object(),
  params: Joi.object(),
  body: Joi.object({
    name: Joi.string().required().messages({
      "string.required": "Missing required name field",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email format",
      "string.required": "Missing required email field",
    }),
    phone: Joi.string().required().messages({
      "stirng.required": "Missing required phone field",
    }),
  }),
});

module.exports = createContactSchema;
