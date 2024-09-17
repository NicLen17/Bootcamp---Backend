const express = require('express')
const { obtenerTodosLosCursos, obtenerUnCurso, crearCurso, eliminarCurso, editarCurso } = require('../controllers/cursos.controllers')
const router = express.Router()

router.get('/', obtenerTodosLosCursos)
router.get('/:idCurso', obtenerUnCurso)
router.delete('/:idCurso', eliminarCurso)
router.put('/:idCurso', editarCurso)
router.post('/', crearCurso)

module.exports = router