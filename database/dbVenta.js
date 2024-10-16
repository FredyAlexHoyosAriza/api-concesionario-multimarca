import { dbConection } from "./dbConection.js";
import { ObjectId } from "mongodb";

const dbVenta = {
  // Operación para insertar un venta
  add: async (vehicleData) => {
    const { db } = await dbConection(); // Obtener la conexión a la base de datos
    try {
      const result = await db.collection("Ventas").insertOne(vehicleData);
      return result.insertedId; // Retornar el ID dla venta insertado
    } catch (error) {
      console.error("Error al insertar venta:", error);
      throw new Error("No se pudo insertar la venta");
    }
  },

  // Operación para listar todas las ventas
  list: async () => {
    const { db } = await dbConection(); // Obtener la conexión a la base de datos
    try {
      const ventas = await db
        .collection("Ventas")
        //{ estado: 'inactivo'} este es un filtro; es posible enviarlo por req.query o req.body
        .find({})
        .limit(50)
        .toArray();
      return ventas; // Retornar el array de ventas
    } catch (error) {
      console.error("Error al obtener ventas:", error);
      throw new Error("No se pudieron obtener las ventas");
    }
  },

  getOne: async (id) => {
    const { db } = await dbConection(); // Obtener la conexión a la base de datos
    try {
      const venta = await db
        .collection("Ventas")
        .findOne({ _id: ObjectId.createFromHexString(id) });
      return venta; // Retornar la venta
    } catch (error) {
      console.error("Error al obtener venta:", error);
      throw new Error("No se pudó obtener la venta");
    }
  },

  // Operación para insertar un venta
  update: async ({ body, params }) => {
    const { db } = await dbConection(); // Obtener la conexión a la base de datos
    try {
      // const vehicleFilter = { _id: new ObjectId(params.id) };
      const updatedVehicle  = await db.collection("Ventas").findOneAndUpdate(
        { _id: ObjectId.createFromHexString(params.id) },
        {
          $set: body,
        },
        {
          // upsert: true, // sino no lo encuentra lo crea
          returnOriginal: true,
        }
      );
      return updatedVehicle; // Retornar la venta actualizada
    } catch (error) {
      console.error("Error al actualizar la venta:", error);
      throw new Error("No se pudo actualizar la venta");
    }
  },

  delete: async (id) => {
    const { db } = await dbConection(); // Obtener la conexión a la base de datos
    try {
      const deletedVehicle = await db.collection("Ventas").findOneAndDelete(
        { _id: ObjectId.createFromHexString(id) }
      );
      return deletedVehicle; // Retornar la venta eliminada
    } catch (error) {
      console.error("Error al eliminar la venta:", error);
      throw new Error("No se pudo eliminar la venta");
    }
  },
};

export default dbVenta;
