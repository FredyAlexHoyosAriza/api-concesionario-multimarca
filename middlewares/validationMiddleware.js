import { vehicleSchema, mongoIdScheme } from "../validation/vehicleModel.js";

// Función que devuelve un middleware para validar datos con un schema específico
const validateSchema = (bodyData, paramsId) => {
  return (req, res, next) => {
    if (bodyData) {
      const { error } = vehicleSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message }); // retorna para evadir next
      }
    }
    if (paramsId) {
      // Validación para un parámetro de id
      const { error } = mongoIdScheme.validate(req.params);
      if (error) {
        return res.status(400).json({ error: error.details[0].message }); // retorna para evadir next
      }
    }
    next(); // Si la validación pasa, continuar al siguiente middleware/controlador
  };
};

export const validateVehicleAdd = validateSchema(true);
export const validateVehicleUpdate = validateSchema(true, true);
export const validateVehicleDelete = validateSchema(false, true);
