import express from "express";
import userController from "../controllers/userController.js";
import validateSchema from "../middlewares/validateSchema.js"; // Importar middleware
import { userSchema } from "../validation/userSchema.js"; // Importar userSchema

const router = express.Router();

// Función para manejar el request y ejecutar el controlador
const handleRequest = (controller) => async (req, res) => {
  const response = await controller(req);
  res.status(response.status).json(response.data || { error: response.error });
};

// Rutas con los middlewares de validación correspondientes

router.post(
  "/",
  validateSchema(userSchema, true, false, false),
  handleRequest(userController.add)
);

router.get("/", handleRequest(userController.list)); // No requiere validación

router.put(
  "/:id",
  validateSchema(userSchema, true, true, false),
  handleRequest(userController.update)
);

router.delete(
  "/:id",
  validateSchema(null, false, true),
  handleRequest(userController.remove)
);

router.get(
  "/:id",
  validateSchema(null, false, true),
  handleRequest(userController.getOne)
);

router.patch(
  "/:id",
  validateSchema(userSchema, false, true, true),
  handleRequest(userController.update)
);

export default router;
