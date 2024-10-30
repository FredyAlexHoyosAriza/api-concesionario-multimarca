import Joi from "joi";

// Esquema de validación de usuario
export const userSchema = Joi.object({
  _id: Joi.string().optional(),
  user_id: Joi.string().required(),
  email: Joi.string().email().required(),
  email_verified: Joi.boolean().required(),
  name: Joi.string().min(1).required(),
  role: Joi.string().valid("user", "admin").default('user').required(), //.default('user'),//Dependiendo de los roles permitidos
  nickname: Joi.string().optional(),
  picture: Joi.string().uri().optional(),
  created_at: Joi.string().isoDate().required(),
  updated_at: Joi.string().isoDate().required(),
  theme_preference: Joi.string().optional()
});