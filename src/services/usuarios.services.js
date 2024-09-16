const Usuario = require("../models/usuarios.schema")
const listarUsuarios = async() => {
  try {
    const usuarios = await Usuario.find()
    return{
      usuarios,
      statusCode: 200
    }
  } catch (error) {
    return {
      msg:'Error al obtener los usuarios',
      statusCode: 500,
      error
     }
  }
}

const obtenerUsuario = async(idUsuario) => {
  try {
    const usuario = await Usuario.findById(idUsuario)
    return{
      usuario,
      statusCode: 200
    }
  } catch (error) {
    return {
      msg:'Error al obtener el usuario',
      statusCode: 500,
      error
     }
  }
}

module.exports= {
    listarUsuarios,
    obtenerUsuario
}