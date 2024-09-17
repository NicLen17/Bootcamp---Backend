const express = require('express')
const router = express.Router()

router.use('/cursos', require('./cursos.routes'))
router.use('/usuarios', require('./usuarios.routes'))

module.exports = router