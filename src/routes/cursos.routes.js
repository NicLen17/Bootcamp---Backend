const express = require('express')
const { obtenerTodosLosCursos, obtenerUnCurso, crearCurso, agregarImagenCurso, eliminarCurso, editarCurso } = require('../controllers/cursos.controllers')
const multer = require('../middlewares/multer')
const auth = require('../middlewares/auth')
const router = express.Router()

router.post('/', auth('admin'),  crearCurso)
router.post('/agregarImagen/:idCurso', auth('admin'), multer.single('imagen'), agregarImagenCurso)
router.get('/', obtenerTodosLosCursos)
router.get('/:idCurso', obtenerUnCurso)
router.delete('/:idCurso', auth('admin'), eliminarCurso)
router.put('/:idCurso', auth('admin'), editarCurso)

module.exports = router