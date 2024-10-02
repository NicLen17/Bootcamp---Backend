const express = require("express");
const router = express.Router();
const { listarUsuarios, obtenerUsuario, crearUsuario, inicioSesion, cambiarEstadoUsuario, editarUsuario, eliminarUsuario, obtenerCarrito, comprar, obtenerCursosUsuario, forgotPassword, resetPassword, whatsAppApi } = require('../controllers/usuarios.controllers')
const { check } = require('express-validator');
const auth = require("../middlewares/auth");

router.post('/', [
    check('nombre', 'Campo Nombre de Usuario vacío').notEmpty(),
    check('nombre', 'El nombre debe tener entre 4 y 20 caracteres').isLength({ min: 4, max: 20 }),
    check('email', 'Campo Email vacío').notEmpty(),
    check('email', 'Introduce un correo válido').isEmail(),
    check('email', 'El correo debe tener entre 10 y 50 caracteres').isLength({ min: 10, max: 50 }),
    check('password', 'Campo Contraseña vacío').notEmpty(),
    check('password', 'La contraseña debe tener entre 6 y 75 caracteres').isLength({ min: 6, max: 75 }),
    check('password', 'La contraseña debe contener al menos una letra, un número y un símbolo').matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,75}$/),
    check('rol', 'El rol debe ser admin o usuario').optional().isIn(['admin', 'usuario'])
], crearUsuario)
router.post('/login', [
    check('nombre', 'Campo Nombre de Usuario vacío').notEmpty(),
    check('nombre', 'El nombre debe tener entre 4 y 20 caracteres').isLength({ min: 4, max: 20 }),
    check('password', 'Campo Contraseña vacío').notEmpty(), 
    check('password', 'La contraseña debe tener entre 6 y 75 caracteres').isLength({ min: 6, max: 75 }),
    check('password', 'La contraseña debe contener al menos una letra, un número y un símbolo').matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,75}$/),
],inicioSesion)
router.get('/', auth('admin'), listarUsuarios)
router.get('/carrito', auth('usuario'), obtenerCarrito)
router.get('/cursos', auth('usuario'), obtenerCursosUsuario)
router.get('/:idUsuario', auth('admin'), obtenerUsuario)
router.put('/estado/:idUsuario', auth('admin'), cambiarEstadoUsuario)
router.put('/:idUsuario', auth('admin'), editarUsuario)
router.delete('/:idUsuario', auth('admin'), eliminarUsuario)
router.post('/comprar', auth('usuario'), comprar)
router.post('/whatsapp', whatsAppApi)
router.post('/forgot-password', auth('usuario'), forgotPassword);
router.post('/reset-password/:token', auth('usuario'), resetPassword);

module.exports = router;