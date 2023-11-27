const db = require("../models/db");
// GET /categorias

exports.listarMarcas = async (req, res) => {
  const sql = "SELECT * FROM marcas";

  try {
    const [marcas, fields] = await db.query(sql);
    res.status(200).json(marcas);
  } catch (err) {
    res.status(500).send({ mensaje: "Error en el servidor" }, { error: err });
  }
};

exports.listarMarcasId = async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM marcas WHERE id_marcas = ?";
  //console.log(id);

  try {
    const [rows, fields] = await db.query(sql, [id]);

    if (rows.length === 0) {
      res.status(404).send({ mensaje: "Marca no encontrada o registrada" });
      return;
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    res
      .status(500)
      .send({ mensaje: "Error al buscar la marca del vehiculo" }, { error: err });
  }
};

exports.agregarMarcas = async (req, res) => {
  const { nombre_marca } = req.body;
  const sql = "INSERT INTO marcas (nombre_marca) VALUE (?)";

  try {
    const resultado = await db.query(sql, [nombre_marca]);
    res.status(200).send({ id: resultado.idInsertado, ...req.body });
  } catch (err) {
    res
      .status(500)
      .send({ mensaje: "Error al insertar la marca del vehiculo" }, { error: err });
  }
};

exports.actualizarMarcas = async (req, res) => {
  const id = req.params.id;
  const { nombre_marca } = req.body;

  const sql =
    "UPDATE marcas SET nombre_marca = ? WHERE id_marca = ?";

  try {
    await db.query(sql, [nombre_marca, id]);
    res.status(200).send({ mensaje: "Marca del vehiculo actualizada" });
  } catch (err) {
    res
      .status(500)
      .send({ mensaje: "Error al actualizar la marca del vehiculo" }, { error: err });
  }
};

exports.eliminarMarcas = async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM marcas WHERE id_marca = ?";

  try {
    await db.query(sql, [id]);
    res.status(200).send({ mensaje: "Marca eliminado" });
  } catch (err) {
    res
      .status(500)
      .send({ mensaje: "Error al eliminar la marca" }, { error: err });
  }
};