// @ts-nocheck
import express from 'express';

const router = express.Router();

import vehiclesRouter from './vehiculos.js';

router.use('/vehiculos', vehiclesRouter);// Este es un middleware

export default router;