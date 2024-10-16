import dbVenta from "../database/dbVenta.js";

// Controlador para agregar venta
const add = async (req) => {
  try {
    const insertedId = await dbVenta.add(req.body);
    return {
      status: 201,
      data: {
        message: "Venta insertada exitosamente",
        id: insertedId,
      },
    };
  } catch (error) {
    console.error("Error al insertar la venta:", error);
    return {
      status: 500,
      error: error.message || "No se pudo insertar la venta",
    };
  }
};

// Controlador para listar ventas
const list = async () => {
  try {
    const ventas = await dbVenta.list();
    return {
      status: 200,
      data: ventas,
    };
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    return {
      status: 500,
      error: error.message || "Error interno del servidor",
    };
  }
};

// Controlador para actualizar venta
const update = async (req) => {
  try {
    const updatedSale = await dbVenta.update(req);
    if (!updatedSale) {
      return {
        status: 404,
        error: "Venta no encontrada",
      };
    }
    return {
      status: 200,
      data: {
        message: "Venta actualizada exitosamente",
        id: updatedSale._id,
      },
    };
  } catch (error) {
    console.error("Error al actualizar la venta:", error);
    return {
      status: 500,
      error: error.message || "No se pudo actualizar la venta",
    };
  }
};

// Controlador para eliminar venta
const remove = async (req) => {
  try {
    const deletedSale = await dbVenta.delete(req.params.id);
    if (!deletedSale) {
      return {
        status: 404,
        error: "Venta no encontrada",
      };
    }
    return {
      status: 200,
      data: {
        message: "Venta eliminada exitosamente",
        id: deletedSale._id,
      },
    };
  } catch (error) {
    console.error("Error al eliminar la venta:", error);
    return {
      status: 500,
      error: error.message || "No se pudo eliminar la venta",
    };
  }
};

// Controlador para obtener venta
const getOne = async (req) => {
  try {
    const gettedSale = await dbVenta.getOne(req.params.id);
    if (!gettedSale) {
      return {
        status: 404,
        error: "Venta no encontrada",
      };
    }
    return {
      status: 200,
      data: gettedSale,
    };
  } catch (error) {
    console.error("Error al obtener la venta:", error);
    return {
      status: 500,
      error: error.message || "No se pudo obtener la venta",
    };
  }
};

export default { add, list, update, remove, getOne };