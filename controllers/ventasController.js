const db = require("../models/db");

exports.listarVentas = async (req, res) => {
    const sql = `
    SELECT ventas.id_venta, ventas.id_usuario, ventas.id_producto, ventas.cantidad, ventas.fecha_venta, usuarios.nombre_usuario, productos.nombre_producto
    FROM ventas
    INNER JOIN usuarios ON ventas.id_usuario = usuarios.id_usuario
    INNER JOIN productos ON ventas.id_producto = productos.id_producto
    ORDER BY ventas.id_venta ASC;  -- ASC para ordenar de manera ascendente
  `;
  
    try {
      const [roles, fields] = await db.query(sql);
      res.status(200).json(roles);
    } catch (err) {
      res.status(500).send({ mensaje: "Error en el servidor" }, { error: err });
    }
  };
  
  exports.listarVentasId = async (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT ventas.id_venta, ventas.id_usuario, ventas.id_producto, ventas.cantidad, ventas.fecha_venta, usuarios.nombre_usuario, productos.nombre_producto
    FROM ventas
    INNER JOIN usuarios ON ventas.id_usuario = usuarios.id_usuario
    INNER JOIN productos ON ventas.id_producto = productos.id_producto WHERE id_venta = ?
    ORDER BY ventas.id_venta ASC;  -- ASC para ordenar de manera ascendente
  `;
    //console.log(id);
  
    try {
      const [rows, fields] = await db.query(sql, [id]);
  
      if (rows.length === 0) {
        res.status(404).send({ mensaje: "Venta no encontrado" });
        return;
      }
      res.status(200).json(rows[0]);
    } catch (err) {
      res
        .status(500)
        .send({ mensaje: "Error al buscar la venta" }, { error: err });
    }
  };
  exports.agregarVentas = async (req, res) => {
    const { id_usuario,id_producto,cantidad,fecha_venta} = req.body;
    const sql = "INSERT INTO ventas (id_usuario,id_producto,cantidad,fecha_venta) VALUE (?,?,?,?)";
  
    try {
      const resultado = await db.query(sql, [id_usuario,id_producto,cantidad,fecha_venta]);
      res.status(200).send({ id: resultado.idInsertado, ...req.body });
    } catch (err) {
      res
        .status(500)
        .send({ mensaje: "Error al insertar la venta" }, { error: err });
    }
  };
  
  exports.actualizarVentas = async (req, res) => {
    const id = req.params.id;
    const { id_usuario,id_producto,cantidad,fecha_venta } = req.body;
  
    const sql =
      "UPDATE ventas SET id_usuario = ?, id_producto = ? ,cantidad = ? ,fecha_venta = ? WHERE id_venta = ?";
  
    try {
      await db.query(sql, [id_usuario,id_producto,cantidad,fecha_venta, id]);
      res.status(200).send({ mensaje: "Venta actualizada" });
    } catch (err) {
      res
        .status(500)
        .send({ mensaje: "Error al actualizar la venta" }, { error: err });
    }
  };
  
  exports.eliminarVentas = async (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM ventas WHERE id_venta = ?";
  
    try {
      await db.query(sql, [id]);
      res.status(200).send({ mensaje: "Venta eliminada" });
    } catch (err) {
      res
        .status(500)
        .send({ mensaje: "Error al eliminar la venta" }, { error: err });
    }
  };