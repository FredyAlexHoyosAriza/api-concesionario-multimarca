import Joi from 'joi';

import { userSchema } from './userSchema.js'; // Asegúrate de importar correctamente
import { vehicleSchema } from './vehicleSchema.js'; // Asegúrate de importar correctamente

export const saleSchema = Joi.object({
  vehiculo: vehicleSchema.required(),  // Usa el esquema del vehículo
  vendedor: userSchema.required(),     // Usa el esquema del vendedor
  precio_total: Joi.number().positive().precision(2).required(), 
});

// export const saleSchema = Joi.object({
//     id_vehiculo: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // ID del vehículo
//     id_cliente: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // ID del cliente que compra el vehículo
//     id_vendedor: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // ID del vendedor que atiende la venta
//     cantidad: Joi.number().integer().min(1).required(), // Cantidad de vehículos vendidos (generalmente será 1)
//     precio_total: Joi.number().positive().precision(2).required(), // Precio total de la venta
//     // fecha: Joi.date().default(() => new Date()), // Fecha de la venta manejada por MongoDB con mongoose
//     estado: Joi.string().valid('pendiente', 'completada', 'cancelada').required(), // Estado de la venta
//     metodo_pago: Joi.string().valid('efectivo', 'tarjeta', 'transferencia').required(), // Método de pago
//   });