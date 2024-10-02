const express = require('express')
const { obtenerTodosLosCursos, obtenerUnCurso, crearCurso, agregarImagenCurso, eliminarCurso, editarCurso, agregarEliminarCursoCarrito, cambiarEstadoCurso, obtenerTodosLosCursosHabilitados, puntuarCurso, obtenerTodasLasValoraciones, obtenerValoracionGeneral } = require('../controllers/cursos.controllers')

const multer = require('../middlewares/multer')
const auth = require('../middlewares/auth')
const router = express.Router()

router.post('/', auth('admin'),  crearCurso)
router.post('/agregarImagen/:idCurso', auth('admin'), multer.single('imagen'), agregarImagenCurso)
router.post('/agregarEliminarCursoCarrito/:idCurso', auth('usuario'), agregarEliminarCursoCarrito)
router.get('/', auth('admin'), obtenerTodosLosCursos)
router.get('/cursosHabilitados', obtenerTodosLosCursosHabilitados)
router.get('/:idCurso', obtenerUnCurso)
router.delete('/:idCurso', auth('admin'), eliminarCurso)
router.put('/:idCurso', auth('admin'), editarCurso)
router.put('/estado/:idCurso', auth('admin'), cambiarEstadoCurso)
router.post('/puntuar/:idCurso', auth('usuario'), puntuarCurso)
router.get('/valoraciones/:idCurso', auth('admin'), obtenerTodasLasValoraciones)
router.get('/valoracionGeneral/:idCurso', obtenerValoracionGeneral)

module.exports = router