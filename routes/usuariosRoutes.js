const express = require("express");
const usuariosController = require("../controllers/usuariosController");
const router = express.Router();

router.get("/", usuariosController.listarUsuarios);
router.get("/:id", usuariosController.listarUsuariosId);
router.post("/", usuariosController.agregarUsuarios);
router.put("/:id", usuariosController.actualizarUsuarios);
router.delete("/:id", usuariosController.actualizarProductosEstados);

module.exports = router;