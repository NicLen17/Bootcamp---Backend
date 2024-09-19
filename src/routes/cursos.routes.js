const express = require('express')
<<<<<<< HEAD
const { obtenerTodosLosCursos, obtenerUnCurso, crearCurso, agregarImagenCurso, eliminarCurso, editarCurso, agregarEliminarCursoCarrito } = require('../controllers/cursos.controllers')
=======
const { obtenerTodosLosCursos, obtenerUnCurso, crearCurso, agregarImagenCurso, eliminarCurso, editarCurso, cambiarEstadoCurso } = require('../controllers/cursos.controllers')
>>>>>>> a2bdcc0113f72b8406d1c96abaa56c2a9b4f0917
const multer = require('../middlewares/multer')
const auth = require('../middlewares/auth')
const router = express.Router()

router.post('/', auth('admin'),  crearCurso)
router.post('/agregarImagen/:idCurso', auth('admin'), multer.single('imagen'), agregarImagenCurso)
router.post('/agregarEliminarCursoCarrito/:idCurso', auth('usuario'), agregarEliminarCursoCarrito)
router.get('/', obtenerTodosLosCursos)
router.get('/:idCurso', obtenerUnCurso)
router.delete('/:idCurso', auth('admin'), eliminarCurso)
router.put('/:idCurso', auth('admin'), editarCurso)
router.put('/estado/:idCurso', auth('admin'), cambiarEstadoCurso)

module.exports = router