import Joi from "joi";

// Esquema de validación de usuario
const userSchema = Joi.object({
  nombre: Joi.string().min(3).max(50).trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string()
               .min(8)
               .max(100)
               .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/)
               .message("Password must contain at least one letter and one number")
               .required(),
  rol: Joi.string().valid('admin', 'user', 'moderator').required(),
  estado: Joi.boolean().required()
});
