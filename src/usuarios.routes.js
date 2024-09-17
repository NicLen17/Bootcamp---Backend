const express = require("express");
const router = express.Router();
const { listarUsuarios, obtenerUsuario, crearUsuario, inicioSesion } = require('./controllers/usuarios.controllers')
const { check } = require('express-validator')

router.post('/', [
    check('nombre', 'Campo Nombre de Usuario vacío').notEmpty(),
    check('nombre', 'El nombre debe tener entre 4 y 20 caracteres').isLength({ min: 4, max: 20 }),
    check('email', 'Campo Email vacío').notEmpty(),
    check('email', 'Introduce un correo válido').isEmail(),
    check('email', 'El correo debe tener entre 10 y 50 caracteres').isLength({ min: 10, max: 50 }),
    check('password', 'Campo Contraseña vacío').notEmpty(), // faltan mas validaciones en el password
    check('rol', 'El rol debe ser admin o usuario').optional().isIn(['admin', 'usuario'])
  ], crearUsuario)
  router.post('/login', [
    check('nombre', 'Campo Nombre de Usuario vacío').notEmpty(),
    check('nombre', 'El nombre debe tener entre 4 y 20 caracteres').isLength({ min: 4, max: 20 }),
    check('email', 'Campo Email vacío').notEmpty(),
    check('email', 'Introduce un correo válido').isEmail(),
    check('email', 'El correo debe tener entre 10 y 50 caracteres').isLength({ min: 10, max: 50 }),
    check('password', 'Campo Contraseña vacío').notEmpty(), // faltan mas validaciones en el password
    check('rol', 'El rol debe ser admin o usuario').optional().isIn(['admin', 'usuario'])
  ],inicioSesion)
router.get('/',listarUsuarios)
router.get('/:idUsuario', obtenerUsuario)

module.exports = router;