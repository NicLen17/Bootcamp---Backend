const express = require('express')
const { obtenerTodosLosCursos } = require('./controllers/cursos.controllers')
const router = express.Router()

router.get('/', obtenerTodosLosCursos)

module.exports = router