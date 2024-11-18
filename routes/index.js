// @ts-nocheck
import express from 'express';
import vehiclesRouter from './vehiculos.js';
import usersRouter from './usuarios.js';
import salesRouter from './ventas.js';

const router = express.Router();

router.use('/vehiculos', vehiclesRouter);// Este es un middleware
router.use('/usuarios', usersRouter);// Este es un middleware
router.use('/ventas', salesRouter);// Este es un middleware

// Ruta raíz de la API
router.get("/", async (req, res) => {
    res.status(200).json({ message: 'Welcome to the API!' });
});

export default router;