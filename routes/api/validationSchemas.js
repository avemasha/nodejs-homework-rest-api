const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.required": "Missing required name field",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.required": "Missing required email field",
  }),
  phone: Joi.string().required().messages({
    "string.required": "Missing required phone field",
  }),
});

module.exports = contactSchema;
