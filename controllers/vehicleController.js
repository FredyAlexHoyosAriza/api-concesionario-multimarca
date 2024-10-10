import dbVehiculo from "../database/dbVehiculo.js";

// Controlador para agregar vehículo
const add = async (body) => {
  try {
    const insertedId = await dbVehiculo.add(body);
    return {
      status: 201,
      data: {
        message: "Vehículo insertado exitosamente",
        id: insertedId,
      },
    };
  } catch (error) {
    console.error("Error al insertar el vehículo:", error);
    return {
      status: 500,
      error: error.message || "No se pudo insertar el vehículo",
    };
  }
};

// Controlador para listar vehículos
const list = async () => {
  try {
    const vehiculos = await dbVehiculo.list();
    return {
      status: 200,
      data: vehiculos,
    };
  } catch (error) {
    console.error("Error al obtener vehículos:", error);
    return {
      status: 500,
      error: error.message || "Error interno del servidor",
    };
  }
};

// Controlador para actualizar vehículo
const update = async (body) => {
  try {
    const updatedVehicle = await dbVehiculo.update(body);
    if (!updatedVehicle) {
      return {
        status: 404,
        error: "Vehículo no encontrado",
      };
    }
    return {
      status: 200,
      data: {
        message: "Vehículo actualizado exitosamente",
        id: updatedVehicle._id,
      },
    };
  } catch (error) {
    console.error("Error al actualizar el vehículo:", error);
    return {
      status: 500,
      error: error.message || "No se pudo actualizar el vehículo",
    };
  }
};

// Controlador para eliminar vehículo
const remove = async (body) => {
  try {
    const deletedVehicle = await dbVehiculo.delete(body);
    if (!deletedVehicle) {
      return {
        status: 404,
        error: "Vehículo no encontrado",
      };
    }
    return {
      status: 200,
      data: {
        message: "Vehículo eliminado exitosamente",
        id: deletedVehicle._id,
      },
    };
  } catch (error) {
    console.error("Error al eliminar el vehículo:", error);
    return {
      status: 500,
      error: error.message || "No se pudo eliminar el vehículo",
    };
  }
};

export default { add, list, update, remove };