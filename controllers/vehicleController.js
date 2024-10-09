import dbVehiculo from "../database/dbVehiculo.js";
import { vehicleSchema, vehicleSchemaJustId, vehicleSchemaFull } from "../validation/vehicleModel.js"; // Importar el esquema del vehículo

const add = async (req, res) => {
  // Validar los datos de entrada usando el esquema importado
  const { error } = vehicleSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const insertedId = await dbVehiculo.add(req.body); // Llamar a la operación para insertar el vehículo
    res.status(201).json({
      message: "Vehículo insertado exitosamente",
      id: insertedId,
    });
  } catch (error) {
    // Manejo de error que proviene de dbVehiculo
    console.error("Error al insertar el vehículo:", error);
    res
      .status(500)
      .json({ error: error.message || "No se pudo insertar el vehículo" });
  }
};

const list = async (req, res) => {
  try {
    const vehiculos = await dbVehiculo.list(); // Llamar a la operación para listar vehículos
    res.status(200).json(vehiculos);
  } catch (error) {
    console.error("Error al obtener vehículos:", error);
    res
      .status(500)
      .json({ error: error.message || "Error al obtener vehículos" });
  }
};

const update = async (req, res) => {
  // Validar los datos de entrada usando el esquema importado
  const { error } = vehicleSchemaFull.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const updatedVehicle  = await dbVehiculo.update(req.body); // Llamar a la operación para editar el vehículo
    if (!updatedVehicle) {
      return res.status(404).json({ error: "Vehículo no encontrado" });
    }
    res.status(200).json({
      message: "Vehículo actualizado exitosamente",
      id: updatedVehicle._id,
    });
  } catch (error) {
    // Manejo de error que proviene de dbVehiculo
    console.error("Error al actualizar el vehículo:", error);
    res
      .status(500)
      .json({ error: error.message || "No se pudo actualizar el vehículo" });
  }
};

const remove = async (req, res) => {
  const { error } = vehicleSchemaJustId.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const deletedVehicle = await dbVehiculo.delete(req.body); // Llamar a la operación para eliminar un vehículo
    if (!deletedVehicle) {
      return res.status(404).json({ error: "Vehículo no encontrado" });
    }
    res.status(204).send(); // Usar 204 cuando la operación es exitosa y no se retorna contenido
    // res.status(200).json({
    //   message: "Vehículo eliminado exitosamente",
    //   id: deletedVehicle._id,
    // });
  } catch (error) {
    // Manejo de error que proviene de dbVehiculo
    console.error("Error al eliminar el vehículo:", error);
    res
      .status(500)
      .json({ error: error.message || "No se pudo eliminar el vehículo" });
  }
};

export default { add, list, update, remove };
