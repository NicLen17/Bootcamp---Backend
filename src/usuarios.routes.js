const express = require("express");
const router = express.Router();
const { listarUsuarios, obtenerUsuario } = require('./controllers/usuarios.controllers')


router.get('/',listarUsuarios)
router.get('/:idUsuario', obtenerUsuario)

module.exports = router;