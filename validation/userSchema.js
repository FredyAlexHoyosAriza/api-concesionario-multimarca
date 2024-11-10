import Joi from "joi";

const auth0IdSchema = Joi.string() //Debo guardarlo en userSchema y desde allí llamarlo?
  .pattern(/^[a-zA-Z0-9_-]+\|[a-zA-Z0-9]+$/)
  .messages({
    "string.pattern.base":
      "El user_id debe seguir el formato proveedor|identificador, por ejemplo, auth0|1234567890abcdef.",
    "string.empty": "El user_id es obligatorio.",
  });

// Esquema de validación de usuario
export const userSchema = Joi.object({
  _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),//MongDB scheme
  user_id: auth0IdSchema.required(),
  email: Joi.string().email().required(),
  email_verified: Joi.boolean().required(),
  name: Joi.string().min(1).required(),
  role: Joi.string()
    .valid("user", "admin", "seller", "client")
    .default("user")
    .required(), //.default('user'),//Dependiendo de los roles permitidos
  nickname: Joi.string().optional(),
  picture: Joi.string().uri().optional(),
  created_at: Joi.string().isoDate().required(),
  updated_at: Joi.string().isoDate().required(),
  blocked: Joi.boolean().default(false),
  theme_preference: Joi.string().optional(),
});
