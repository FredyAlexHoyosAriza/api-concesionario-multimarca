import express from "express";
import VehicleController from "../controllers/vehicleController.js";
import {
  validateVehicleAdd,
  validateVehicleUpdate,
  validateVehicleDelete,
} from "../middlewares/validationMiddleware.js"; // Importar el middleware de validación

const router = express.Router();

// Función para manejar el request y ejecutar el controlador
const handleRequest = (controller) => async (req, res) => {
    const response = await controller(req.body);
    res.status(response.status).json(response.data ||  { error: response.error }); 
};

// Rutas con los middlewares de validación correspondientes
router.post("/add", validateVehicleAdd, handleRequest(VehicleController.add));

router.get("/list", handleRequest(VehicleController.list)); // No requiere validación

router.put("/update", validateVehicleUpdate, handleRequest(VehicleController.update));

router.delete("/delete", validateVehicleDelete, handleRequest(VehicleController.remove));

export default router;