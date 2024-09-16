const express = require('express')
const { crearCurso } = require('./controllers/cursos.controllers')
const router = express.Router()

router.post('/', crearCurso)

module.exports = router