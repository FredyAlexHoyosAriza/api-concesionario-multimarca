import Joi from "joi";

// Definir el esquema de validación del vehículo
export const vehicleSchema = Joi.object({
  _id: Joi.string().optional(),
  marca: Joi.string().required(),
  modelo: Joi.number().integer().min(1886).max(2025).required(),
  gama: Joi.string().required(),
  color: Joi.string().required(),
  // Puedes añadir más campos y restricciones según sea necesario
});
