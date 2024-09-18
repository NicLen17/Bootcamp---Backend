const express = require('express')
const { obtenerTodosLosCursos, obtenerUnCurso, crearCurso, agregarImagenCurso, eliminarCurso, editarCurso } = require('../controllers/cursos.controllers')
const multer = require('../middlewares/multer')
const router = express.Router()

router.get('/', obtenerTodosLosCursos)
router.get('/:idCurso', obtenerUnCurso)
router.post('/', crearCurso)
router.post('/agregarImagen/:idCurso', multer.single('imagen'), agregarImagenCurso)
router.delete('/:idCurso', eliminarCurso)
router.put('/:idCurso', editarCurso)

module.exports = router