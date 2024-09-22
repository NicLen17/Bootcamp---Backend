const serviceUsuario = require('../services/usuarios.services')
const { validationResult } = require('express-validator')

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

const eliminarUsuario = async (req, res) => {
  const id = req.params.idUsuario
  const result = await serviceUsuario.eliminarUsuario(id, req.idUsuario)
  if (result.statusCode === 200) {
      res.status(200).json({ msg: result.msg })
  } else {
      res.status(500).json({ msg: result.msg })
  }
}

module.exports = {
    listarUsuarios,
    obtenerUsuario,
    crearUsuario,
    inicioSesion,
    eliminarUsuario
}