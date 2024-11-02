import { dbConection } from "./dbConection.js";
import { ObjectId } from "mongodb";

const dbUsuario = {
  // Operación para insertar un usuario
  add: async (userData) => {
    const { db } = await dbConection(); // Obtener la conexión a la base de datos
    try {
      const result = await db.collection("Usuarios").insertOne(userData);
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
      // const vehicleFilter = { _id: ObjectId.createFromHexString(params.id) };
      const updatedUser  = await db.collection("Usuarios").findOneAndUpdate(
        { _id: ObjectId.createFromHexString(params.id) },
        {
          $set: body,
        },
        {
          // upsert: true, // sino no lo encuentra lo crea
          returnDocument: "before",
        }
      );
      return updatedUser; // Retornar el _id del usuario actualizado
    } catch (error) {
      console.error("Error al actualizar el usuario en BD:", error);
      throw new Error("No se pudo actualizar el usuario en BD");
    }
  },

  delete: async (id) => {
    const { db } = await dbConection(); // Obtener la conexión a la base de datos
    try {
      const deletedUser = await db.collection("Usuarios").findOneAndDelete(
        { _id: ObjectId.createFromHexString(id) }
      );
      return deletedUser; // Retornar el usuario eliminado
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      throw new Error("No se pudo eliminar el usuario");
    }
  },

  updateOrCreate: async (userInfo) => {
    const { db } = await dbConection(); // Obtener la conexión a la base de datos
    try {
      let usuario = await db.collection("Usuarios").findOne({ email: userInfo.email });
      
      // El usuario se actualiza o se crea
      if (usuario) {
        usuario = await db.collection("Usuarios").findOneAndUpdate(
          { user_id: userInfo.user_id },  // Filtro: busca por id de auth0
          { $set: userInfo },         // Actualización: establece los datos de usuario proporcionados
          { returnDocument: "after" } // "after" para obtener el documento actualizado
        );
        return { mongoId: usuario._id, isNew: false }; // Usuario actualizado
      }
      usuario = await db.collection("Usuarios").insertOne(userInfo);
      return { mongoId: usuario.insertedId, isNew: true }; // Usuario creado

    } catch (error) {
      console.error("Error en updateOrCreate:", error);
      throw new Error("No se pudo encontrar o crear el usuario");
    }
  },

  
  // updateOrCreate: async (userInfo) => {
  //   const { db } = await dbConection(); // Obtener la conexión a la base de datos
  //   try {
  //     // Busca inicialmente si el usuario existe
  //     const existingUser = await db.collection("Usuarios").findOne({ email: userInfo.email });
  //     // Realiza el upsert (crea o actualiza) independientemente de si existe
  //     const usuario = await db.collection("Usuarios").findOneAndUpdate(
  //       { user_id: userInfo.user_id },            // Filtro: busca por id de auth0
  //       { $set: userInfo },                       // Actualización: establece los datos de usuario proporcionados
  //       { upsert: true, returnDocument: "after" } // upsert: true para crear si no existe; "after" para obtener el documento actualizado
  //     );
  
  //     // Retorna el ID del usuario y si es nuevo o no
  //     return {
  //       mongoId: usuario._id,
  //       isNew: !existingUser, // isNew será true si el usuario no existía previamente
  //     };
  //   } catch (error) {
  //     console.error("Error en updateOrCreate:", error);
  //     throw new Error("No se pudo encontrar o crear el usuario");
  //   }
  // },

  findOrCreate: async (userInfo) => {
    const { db } = await dbConection(); // Obtener la conexión a la base de datos
    try {
      let usuario = await db.collection("Usuarios").findOne({ user_id: userInfo.user_id });
      
      // Si el usuario no existe, crearlo
      if (!usuario) {
        usuario = await db.collection("Usuarios").insertOne(userInfo);
        return { mongoId: usuario.insertedId, isNew: true }; // Usuario creado
      }
  
      // Usuario encontrado
      return { mongoId: usuario._id, isNew: false };
    } catch (error) {
      console.error("Error en findOrCreate:", error);
      throw new Error("No se pudo obtener o insertar el usuario");
    }
  }

};

export default dbUsuario;