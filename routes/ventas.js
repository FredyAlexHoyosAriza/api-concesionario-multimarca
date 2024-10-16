import express from "express";
import saleController from "../controllers/saleController.js";
import validateSchema from "../middlewares/validateSchema.js"; // Importar middleware
import { saleSchema } from "../validation/saleSchema.js"; // Importar saleSchema

const router = express.Router();

// Función para manejar el request y ejecutar el controlador
const handleRequest = (controller) => async (req, res) => {
  const response = await controller(req);
  res.status(response.status).json(response.data || { error: response.error });
};

// Rutas con los middlewares de validación correspondientes

router.post(
  "/",
  validateSchema(saleSchema, true, false, false),
  handleRequest(saleController.add)
);

router.get("/", handleRequest(saleController.list)); // No requiere validación

router.put(
  "/:id",
  validateSchema(saleSchema, true, true, false),
  handleRequest(saleController.update)
);

router.delete(
  "/:id",
  validateSchema(null, false, true),
  handleRequest(saleController.remove)
);

router.get(
  "/:id",
  validateSchema(null, false, true),
  handleRequest(saleController.getOne)
);

router.patch(
  "/:id",
  validateSchema(saleSchema, false, true, true),
  handleRequest(saleController.update)
);

export default router;
