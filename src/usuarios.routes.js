const express = require("express");
const router = express.Router();
const { listarUsuarios } = require('./controllers/usuarios.controllers')


router.get('/',listarUsuarios)

module.exports = router;