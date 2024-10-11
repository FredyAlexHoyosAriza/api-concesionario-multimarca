import Joi from "joi";

// Definir mongoIdScheme una sola vez
const mongoIdScheme = Joi.object({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

// Middleware para validar datos con un esquema opcional
const validateSchema = (schema = null, bodyData = false, paramsId = false, atLeast1 = false) => {
  return (req, res, next) => {
    if (bodyData) {
      // Validación del body si hay un esquema
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message }); // retorna para evadir next
      }
    }

    if (paramsId) {
      // Validación del parámetro de id
      const { error } = mongoIdScheme.validate(req.params);
      if (error) {
        return res.status(400).json({ error: error.details[0].message }); // retorna para evadir next
      }
    }

    if (atLeast1) {
      // Verifica que haya al menos un campo en el body
      const bodyKeys = Object.keys(req.body);
      if (bodyKeys.length < 1) {
        return res.status(400).json({ error: "Bad request; no data provided" });
      }
      // Crear un nuevo esquema basado en las claves de req.body
      const dynamicSchema = {};
      bodyKeys.forEach((key) => {
        if (schema.describe().keys[key]) {
          // Verificar si la clave existe en el esquema original
          dynamicSchema[key] = schema.extract(key); // Extraer esa parte del esquema
        }
      });
      // Se valida esquema Joi con solo las claves permitidas
      const { error } = Joi.object(dynamicSchema).validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message }); // retorna para evadir next
      }
    }

    next(); // Si todas las validaciones pasan, continúa al siguiente middleware/controlador
  };
};

export default validateSchema;
