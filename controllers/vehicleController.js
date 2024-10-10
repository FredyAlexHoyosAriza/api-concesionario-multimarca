import dbVehiculo from "../database/dbVehiculo.js";
import {
  vehicleSchema,
  vehicleSchemaJustId,
  vehicleSchemaFull,
} from "../validation/vehicleModel.js"; // Importar el esquema del vehículo

const add = async (body) => {
  // Validar los datos de entrada usando el esquema importado
  const { error } = vehicleSchema.validate(body);
  if (error) {
    return {
      status: 400,
      error: error.details[0].message,
    };
  }

  try {
    const insertedId = await dbVehiculo.add(body); // Llamar a la operación para insertar el vehículo
    return {
      status: 201,
      data: {
        message: "Vehículo insertado exitosamente",
        id: insertedId,
      },
    };
  } catch (error) {
    // Manejo de error que proviene de dbVehiculo
    console.error("Error al insertar el vehículo:", error);
    return {
      status: 500,
      error: error.message || "No se pudo insertar el vehículo",
    };
  }
};

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

const update = async (body) => {
  // Validar los datos de entrada usando el esquema importado
  const { error } = vehicleSchemaFull.validate(body);
  if (error) {
    return {
      status: 400,
      error: error.details[0].message,
    };
  }

  try {
    const updatedVehicle = await dbVehiculo.update(body); // Llamar a la operación para editar el vehículo
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
    // Manejo de error que proviene de dbVehiculo
    console.error("Error al actualizar el vehículo:", error);
    return {
      status: 500,
      error: error.message || "No se pudo actualizar el vehículo",
    };
  }
};

const remove = async (body) => {
  const { error } = vehicleSchemaJustId.validate(body);
  if (error) {
    return {
      status: 400,
      error: error.details[0].message,
    };
  }

  try {
    const deletedVehicle = await dbVehiculo.delete(body); // Llamar a la operación para eliminar un vehículo
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
    //res.status(204).send(); // Usar 204 cuando la operación es exitosa y no se retorna contenido
  } catch (error) {
    // Manejo de error que proviene de dbVehiculo
    console.error("Error al eliminar el vehículo:", error);
    return {
      status: 500,
      error: error.message || "No se pudo eliminar el vehículo",
    };
  }
};

export default { add, list, update, remove };
