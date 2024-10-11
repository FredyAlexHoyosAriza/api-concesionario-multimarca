import express from "express";
import vehicleController from "../controllers/vehicleController.js";
import validateSchema from "../middlewares/validateSchema.js"; // Importar middleware
import { vehicleSchema } from "../validation/vehicleSchema.js"; // Importar vehicleSchema

const router = express.Router();

// Función para manejar el request y ejecutar el controlador
const handleRequest = (controller) => async (req, res) => {
  const response = await controller(req);
  res.status(response.status).json(response.data || { error: response.error });
};

// Rutas con los middlewares de validación correspondientes

router.post(
  "/",
  validateSchema(vehicleSchema, true, false, false),
  handleRequest(vehicleController.add)
);

router.get("/", handleRequest(vehicleController.list)); // No requiere validación

router.put(
  "/:id",
  validateSchema(vehicleSchema, true, true, false),
  handleRequest(vehicleController.update)
);

router.delete(
  "/:id",
  validateSchema(null, false, true),
  handleRequest(vehicleController.remove)
);

router.get(
  "/:id",
  validateSchema(null, false, true),
  handleRequest(vehicleController.getOne)
);

router.patch(
  "/:id",
  validateSchema(vehicleSchema, false, true, true),
  handleRequest(vehicleController.update)
);

export default router;
