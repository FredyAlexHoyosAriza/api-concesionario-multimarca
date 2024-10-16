import { dbConection } from "./dbConection.js";
import { ObjectId } from "mongodb";

const dbUsuario = {
  // Operación para insertar un usuario
  add: async (vehicleData) => {
    const { db } = await dbConection(); // Obtener la conexión a la base de datos
    try {
      const result = await db.collection("Usuarios").insertOne(vehicleData);
      return result.insertedId; // Retornar el ID del usuario insertado
    } catch (error) {
      console.error("Error al insertar usuario:", error);
      throw new Error("No se pudo insertar el usuario");
    }
  },

  // Operación para listar todos los usuarios
  list: async () => {
    const { db } = await dbConection(); // Obtener la conexión a la base de datos
    try {
      const usuarios = await db
        .collection("Usuarios")
        //{ estado: 'inactivo'} este es un filtro; es posible enviarlo por req.query o req.body
        .find({})
        .limit(50)
        .toArray();
      return usuarios; // Retornar el array de usuarios
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw new Error("No se pudieron obtener los usuarios");
    }
  },

  getOne: async (id) => {
    const { db } = await dbConection(); // Obtener la conexión a la base de datos
    try {
      const usuario = await db
        .collection("Usuarios")
        .findOne({ _id: ObjectId.createFromHexString(id) });
      return usuario; // Retornar el usuario
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      throw new Error("No se pudó obtener el usuario");
    }
  },

  // Operación para insertar un usuario
  update: async ({ body, params }) => {
    const { db } = await dbConection(); // Obtener la conexión a la base de datos
    try {
      // const vehicleFilter = { _id: new ObjectId(params.id) };
      const updatedVehicle  = await db.collection("Usuarios").findOneAndUpdate(
        { _id: ObjectId.createFromHexString(params.id) },
        {
          $set: body,
        },
        {
          // upsert: true, // sino no lo encuentra lo crea
          returnOriginal: true,
        }
      );
      return updatedVehicle; // Retornar el _id del usuario actualizado
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      throw new Error("No se pudo actualizar el usuario");
    }
  },

  delete: async (id) => {
    const { db } = await dbConection(); // Obtener la conexión a la base de datos
    try {
      const deletedVehicle = await db.collection("Usuarios").findOneAndDelete(
        { _id: ObjectId.createFromHexString(id) }
      );
      return deletedVehicle; // Retornar el usuario eliminado
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      throw new Error("No se pudo eliminar el usuario");
    }
  },

  // Puedes agregar más operaciones de la misma manera
};

export default dbUsuario;
