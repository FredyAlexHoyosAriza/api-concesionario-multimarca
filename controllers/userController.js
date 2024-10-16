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
    const updatedUser = await dbUsuario.update(req);
    if (!updatedUser) {
      return {
        status: 404,
        error: "Usuario no encontrado",
      };
    }
    return {
      status: 200,
      data: {
        message: "Usuario actualizado exitosamente",
        id: updatedUser._id,
      },
    };
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return {
      status: 500,
      error: error.message || "No se pudo actualizar el usuario",
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

export default { add, list, update, remove, getOne };