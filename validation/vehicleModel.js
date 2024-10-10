import Joi from "joi";

// Definir el esquema de validación del vehículo
export const vehicleSchema = Joi.object({
  // _id: Joi.string().optional(),
  marca: Joi.string().required(),
  modelo: Joi.number().integer().min(1886).max(2025).required(),
  gama: Joi.string().required(),
  color: Joi.string().required(),
  // Puedes añadir más campos y restricciones según sea necesario
});

export const vehicleSchemaJustId = Joi.object({
  _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
});

export const vehicleSchemaFull = Joi.object({
  _id: Joi.string().required(),
  marca: Joi.string().required(),
  modelo: Joi.number().integer().min(1886).max(2025).required(),
  gama: Joi.string().required(),
  color: Joi.string().required(),
});
