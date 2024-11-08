import updateAuth0User from "../auth/auth.js";
import dbUsuario from "../database/dbUsuario.js";

// Controlador para agregar usuario
const add = async (req) => {
  try {
    const insertedId = await dbUsuario.add(req.body);
    return {
      status: 201,
      data: {
        message: "Usuario insertado exitosamente",
        id: insertedId,
      },
    };
  } catch (error) {
    console.error("Error al insertar el usuario:", error);
    return {
      status: 500,
      error: error.message || "No se pudo insertar el usuario",
    };
  }
};

// Controlador para listar usuarios
const list = async () => {
  try {
    const usuarios = await dbUsuario.list();
    return {
      status: 200,
      data: usuarios,
    };
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return {
      status: 500,
      error: error.message || "Error interno del servidor",
    };
  }
};

// Controlador para actualizar usuario
const update = async (req) => {
  try {
    // Actualizar usuario en la base de datos de MongoDB
    const updatedUser = await dbUsuario.update(req);
    if (!updatedUser) {
      return {
        status: 404,
        error: "Usuario no encontrado",
      };
    }

    // Actualizar atributos del usuario en Auth0
    try {
      await updateAuth0User(req.body);
    } catch (auth0Error) {
      console.error("Error al actualizar el usuario en Auth0:", auth0Error);
      return {
        status: 500,
        error: "Usuario actualizado en MongoDB, pero ocurrió un error en Auth0",
      };
    }
    return {
      status: 200,
      // data: updatedUser,
      data: {
        message: "Usuario actualizado exitosamente en MongoDB y Auth0",
        mongoId: updatedUser._id,
      },
    };
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return {
      status: 500,
      error: error.message || "No se pudo actualizar el usuario en BD",
    };
  }
};

// Controlador para eliminar usuario
const remove = async (req) => {
  try {
    const deletedUser = await dbUsuario.delete(req.params.id);
    if (!deletedUser) {
      return {
        status: 404,
        error: "Usuario no encontrado",
      };
    }
    return {
      status: 200,
      data: {
        message: "Usuario eliminado exitosamente",
        id: deletedUser._id,
      },
    };
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return {
      status: 500,
      error: error.message || "No se pudo eliminar el usuario",
    };
  }
};

// Controlador para obtener usuario
const getOne = async (req) => {
  try {
    const gettedUser = await dbUsuario.getOne(req.params.id);
    if (!gettedUser) {
      return {
        status: 404,
        error: "Usuario no encontrado",
      };
    }
    return {
      status: 200,
      data: gettedUser,
    };
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return {
      status: 500,
      error: error.message || "No se pudo obtener el usuario",
    };
  }
};

const updateOrCreate = async (req) => {
  try {
    // Llamada a la función findOrCreate de dbUsuario
    const { user, isNew } = await dbUsuario.updateOrCreate(req.body);

    // Responder con estado 201 si es nuevo o 200 si se actualizó/encontró
    return {
      status: isNew ? 201 : 200,
      data: user,
      // data: {
      //   message: `Usuario ${isNew ? 'creado' : 'encontrado'} exitosamente`,
      //   user: user,
      // },
    };
  } catch (error) {
    // Loguear y retornar el error con status 500
    console.error("Error al encontrar o crear el usuario:", error);
    return {
      status: 500,
      error: error.message || "No se pudo encontrar o crear el usuario",
    };
  }
};


// Controlador para encontrar o crear usuario VERSIÓN ANTERIOR
const findOrCreate = async (req) => {
  try {
    // Llamada a la función findOrCreate de dbUsuario
    const { user, isNew } = await dbUsuario.findOrCreate(req.body);

    // Si se crea un nuevo usuario o se encuentra, devolver status 201 o 200 respectivamente 
    return {
      status: isNew ? 201 : 200,
      data: user,
      // data: {
      //   message: `Usuario ${isNew ? 'creado' : 'encontrado'} exitosamente`,
      //   user: user,
      // },
    };
  } catch (error) {
    // Loguear y retornar el error con status 500
    console.error("Error al encontrar o crear el usuario:", error);
    return {
      status: 500,
      error: error.message || "No se pudo encontrar o crear el usuario",
    };
  }
};


export default { add, list, update, remove, getOne, updateOrCreate, findOrCreate };