const { token } = require('morgan')
const serviceUsuario = require('../services/usuarios.services')
const { validationResult } = require('express-validator')
const logger = require('../utils/logger')

const crearUsuario =  async (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()){
    return res.status(400).json({msg: errors.array()})
  }

 const result = await serviceUsuario.nuevoUsuario(req.body)

  if(result.statusCode === 201){
    res.status(201).json({msg: result.msg})
  }else{
    res.status(500).json({msg: result.msg})
  }
}
const inicioSesion = async( req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()){
    return res.status(400).json({msg: errors.array()})
  }
  
  const result = await serviceUsuario.inicioSesion(req.body)

  if(result.statusCode === 200){
    res.status(200).json({msg: result.msg, rol: result.rol, token: result.token, idUsuario: result.idUsuario} )
  }else{
    res.status(400).json({msg: result.msg})
  }
}

const listarUsuarios = async (req, res) => {
  const result = await serviceUsuario.listarUsuarios()
   
  if(result.statusCode === 200){
   res.status(200).json(result.usuarios)
  }else{
   res.status(500).json({msg: result.msg})
  }
}

const obtenerUsuario = async (req, res) => {
    const result = await serviceUsuario.obtenerUsuario(req.params.idUsuario)
  
    if(result.statusCode === 200){
        res.status(200).json(result.usuario)
    }else{
      res.status(500).json({msg: result.msg})
    }

}

const cambiarEstadoUsuario = async (req, res) => {
  const result = await serviceUsuario.cambiarEstadoUsuario(req.params.idUsuario, req.idUsuario)

  if (result.statusCode === 200) {
      res.status(200).json({ msg: result.msg })
  } else {
      res.status(500).json({ msg: result.msg, error })
  }
}

const editarUsuario = async (req, res) => {
  const id = req.params.idUsuario
  const result = await serviceUsuario.editarUsuario(id, req.body)
  logger.debug(result)
  if (result.statusCode === 200) {
      res.status(200).json({ msg: result.msg })
  } else {
      res.status(500).json({ msg: result.msg, error })
  }
}

const eliminarUsuario = async (req, res) => {
  const id = req.params.idUsuario
  const result = await serviceUsuario.eliminarUsuario(id, req.idUsuario)
  if (result.statusCode === 200) {
      res.status(200).json({ msg: result.msg })
  } else {
      res.status(500).json({ msg: result.msg })
  }
}

const obtenerCarrito = async (req, res) => {
  const result = await serviceUsuario.obtenerCarrito(req.idUsuario)

  if(result.statusCode === 200){
      res.status(200).json(result.cursos)
  }else{
    res.status(500).json({msg: result.msg})
  }
}

const comprar = async (req, res) => {
  const result = await serviceUsuario.comprar(req.idUsuario)

  if(result.statusCode === 200){
      res.status(200).json({
      msg: result.msg,
      link_compra: result.resultMp.sandbox_init_point
    });
  }else{
    res.status(500).json({msg: result.msg})
  }
}

const obtenerCursosUsuario = async (req, res) => {
  const result = await serviceUsuario.obtenerCursosUsuario(req.idUsuario)

  if(result.statusCode === 200){
      res.status(200).json(result.cursos)
  }else{
    res.status(500).json({msg: result.msg})
  }
}

const whatsAppApi = async (req, res) => {
  const result = await serviceUsuario.mensajeWhatsApp()
  if (result.statusCode === 200) {
      res.status(200).json({ msg: result.msg })
  } else {
      res.status(500).json({ msg: result.msg })
  }
}

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const result = await serviceUsuario.forgotPassword(email);

  if (result.statusCode === 200) {
    res.status(200).json({ 
      token: result.token,
      msg: result.msg 
    });
  } else {
    res.status(result.statusCode).json({ msg: result.msg });
  }
};

const resetPassword = async (req, res) => {
  const { password } = req.body;
  const token = req.params.token;

  const result = await serviceUsuario.resetPassword(password, token);

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(result.statusCode).json({ 
      msg: result.msg,
      error: result.error
    });
  }
};

module.exports = {
    listarUsuarios,
    obtenerUsuario,
    crearUsuario,
    inicioSesion,
    cambiarEstadoUsuario,
    editarUsuario,
    eliminarUsuario,
    obtenerCarrito,
    comprar,
    obtenerCursosUsuario,
    whatsAppApi,
    forgotPassword,
    resetPassword
}