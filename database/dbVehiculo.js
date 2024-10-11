import { dbConection } from "./dbConection.js";
import { ObjectId } from "mongodb";

const dbVehiculo = {
  // Operación para insertar un vehículo
  add: async (vehicleData) => {
    const { db } = await dbConection(); // Obtener la conexión a la base de datos
    try {
      const result = await db.collection("Vehiculos").insertOne(vehicleData);
      return result.insertedId; // Retornar el ID del vehículo insertado
    } catch (error) {
      console.error("Error al insertar vehículo:", error);
      throw new Error("No se pudo insertar el vehículo");
    }
  },

  // Operación para listar todos los vehículos
  list: async () => {
    const { db } = await dbConection(); // Obtener la conexión a la base de datos
    try {
      const vehiculos = await db
        .collection("Vehiculos")
        .find({})
        .limit(50)
        .toArray();
      return vehiculos; // Retornar el array de vehículos
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
      throw new Error("No se pudieron obtener los vehículos");
    }
  },

  // Operación para insertar un vehículo
  update: async ({ body, params }) => {
    const { db } = await dbConection(); // Obtener la conexión a la base de datos
    try {
      // const vehicleFilter = { _id: new ObjectId(params.id) };
      const updatedVehicle  = await db.collection("Vehiculos").findOneAndUpdate(
        { _id: ObjectId.createFromHexString(params.id) },
        {
          $set: body,
        },
        {
          upsert: true,
          returnOriginal: true,
        }
      );
      return updatedVehicle; // Retornar el _id del vehículo actualizado
    } catch (error) {
      console.error("Error al actualizar el vehículo:", error);
      throw new Error("No se pudo actualizar el vehículo");
    }
  },

  delete: async (id) => {
    const { db } = await dbConection(); // Obtener la conexión a la base de datos
    try {
      const deletedVehicle = await db.collection("Vehiculos").findOneAndDelete(
        { _id: ObjectId.createFromHexString(id) }
      );
      return deletedVehicle; // Retornar el vehículo eliminado
    } catch (error) {
      console.error("Error al eliminar el vehículo:", error);
      throw new Error("No se pudo eliminar el vehículo");
    }
  },

  // Puedes agregar más operaciones de la misma manera
};

export default dbVehiculo;
