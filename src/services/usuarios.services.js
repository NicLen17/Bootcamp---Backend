const Usuario = require("../models/usuarios.schema")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const nuevoUsuario = async(body) => {
  try {
 
    const usuarioExiste = await Usuario.findOne({nombre: body.nombre})
    const emailExiste = await Usuario.findOne({ email: body.email });
 
    if(usuarioExiste){
      return {
        msg:'El nombre de usuario no esta disponible',
        statusCode: 409
      }
    }

    if (emailExiste) {
      return {
        msg: "El correo no está disponible",
        statusCode: 400,
      };
    }
 
    const usuario = new Usuario(body)
 
    let salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(body.password, salt);
    await usuario.save()
    return {
      msg:'Usuario creado',
      statusCode: 201
    }
  } catch (error) {
    console.log(error)
    return {
      msg:'Error al crear el usuario',
      statusCode: 500,
      error
    }
  }
}

const inicioSesion = async (body) => {
  const usuarioExiste = await Usuario.findOne({nombre: body.nombre})
  if(!usuarioExiste){
    return{
      msg:'Usuario y/o contraseña incorrecto.(U)',
      statusCode: 400
    }
  }

  const checkContrasenia = bcrypt.compareSync(body.password, usuarioExiste.password)

  if(!checkContrasenia){
    return{
      msg:'Usuario y/o contraseña incorrecto.(C)',
      statusCode: 400
    }
  }

  const payload = {
    idUsuario: usuarioExiste._id,
    rol: usuarioExiste.rol,
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET)

  return{
    token,
    rol: usuarioExiste.rol,
    idUsuario:usuarioExiste._id,
    msg:'Usuario logueado',
    statusCode: 200
  }

}

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

const cambiarEstadoUsuario = async (idUsuario, idUsuarioToken) => {
  try {
    if(idUsuario !== idUsuarioToken) {
      const usuario = await Usuario.findById(idUsuario)
      usuario.bloqueado = !usuario.bloqueado
  
      await usuario.save()
  
      if(usuario.bloqueado) {
        return {
          msg: 'Usuario bloqueado',
          statusCode: 200 
        }
      } else {
        return {
          msg: 'Usuario desbloqueado',
          statusCode: 200 
        }
      }
    } else {
      return {
        msg: 'No puedes alternar el estado de tu propio usuario',
        statusCode: 500 
      }
    }
    
  } catch (error) {
    return {    
      msg: "Error al cambiar el estado del usuario",
      statusCode: 500,
      error
    };
  }
}

module.exports= {
    listarUsuarios,
    obtenerUsuario,
    nuevoUsuario,
    inicioSesion,
    cambiarEstadoUsuario
}
