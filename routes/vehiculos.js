// @ts-nocheck
import express from 'express';

const router = express.Router();

import VehicleController from '../controllers/vehicleController.js';


router.post('/add', VehicleController.add);
router.get('/list', VehicleController.list);
router.put('/update', VehicleController.update);
router.delete('/delete', VehicleController.remove);

export default router;