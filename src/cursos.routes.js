const express = require('express')
const { obtenerUnCurso, crearCurso } = require('./controllers/cursos.controllers')
const router = express.Router()

router.get('/:idCurso', obtenerUnCurso)
router.post('/', crearCurso)

module.exports = router