const express = require('express')
const { obtenerTodosLosCursos, obtenerUnCurso, crearCurso } = require('./controllers/cursos.controllers')
const router = express.Router()

router.get('/', obtenerTodosLosCursos)
router.get('/:idCurso', obtenerUnCurso)
router.post('/', crearCurso)

module.exports = router