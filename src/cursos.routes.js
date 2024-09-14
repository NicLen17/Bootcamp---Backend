const express = require('express')
const router = express.Router()

router.get('/', obtenerTodosLosCursos)

module.exports = router