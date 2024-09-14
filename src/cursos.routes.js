const express = require('express')
const { obtenerUnCurso } = require('./controllers/cursos.controllers')
const router = express.Router()

router.get('/:idCurso', obtenerUnCurso)

module.exports = router