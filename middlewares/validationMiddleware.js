import { vehicleSchema, vehicleSchemaJustId, vehicleSchemaFull } from "../validation/vehicleModel.js";

// Función que devuelve un middleware para validar datos con un schema específico
const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });// retorna para evadir next
    }
    next(); // Si la validación pasa, continuar al siguiente middleware/controlador
  };
};

export const validateVehicleAdd = validateSchema(vehicleSchema);
export const validateVehicleUpdate = validateSchema(vehicleSchemaFull);
export const validateVehicleDelete = validateSchema(vehicleSchemaJustId);