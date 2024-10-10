import express from "express";
import VehicleController from "../controllers/vehicleController.js";

const router = express.Router();

const handleRequest = (controller) => async (req, res) => {
    const response = await controller(req.body);
    res.status(response.status).json(response.data ||  { error: response.error }); 
}

router.post("/add", handleRequest(VehicleController.add));

router.get("/list", handleRequest(VehicleController.list));

router.put("/update", handleRequest(VehicleController.update));

router.delete("/delete", handleRequest(VehicleController.remove));

export default router;
