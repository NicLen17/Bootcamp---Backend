const Usuario = require("../models/usuarios.schema")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { registroUsuario, bajaUsuario } = require("../helpers/mensajes")

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

    await registroUsuario(body.nombre, body.email); //Llamado a nodemailer
    
    await usuario.save()
    return {
      msg:'Usuario creado',
      statusCode: 201
    }
  } catch (error) {
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
      if(usuario.rol !== 'admin') {
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
          msg: 'No puedes alternar el estado de un administrador',
          statusCode: 500 
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

const editarUsuario = async (id, body) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(id, body, { new: true });
    if (!usuario) {
      return {
        msg: "Usuario no encontrado",
        statusCode: 404
      };
    }

    if(Object.keys(body).length === 0) {
      return {
        msg: "Error al editar el usuario, el BODY está vacío",
        statusCode: 500,
      };
    }
    
    return {
      msg: "Usuario actualizado con exito!",
      statusCode: 200,
    };
  } catch (error) {
    return {
      msg: "Error al editar el usuario",
      statusCode: 500,
      error
    };
  }
}

const eliminarUsuario = async (id, idUsuarioToken, body) => {
  try {
    if(id !== idUsuarioToken){
      const usuario = await Usuario.findByIdAndDelete(id);
      await bajaUsuario(body.nombre, body.email); //Llamado a nodemailer
      if (!usuario) {
        return { 
          msg: "Usuario no encontrado",
          statusCode: 404
        };
      }
      return { 
        msg: "Usuario eliminado con exito!",
        statusCode: 200 
      };
    } else {
      return {
        msg:'No puedes eliminar tu propio usuario',
        statusCode: 500,
       }
    }
    
  } catch (error) {
    return { msg: "Error al eliminar el usuario", statusCode: 500, error };
  }
};

const obtenerCarrito = async (idUsuario) => {
  try {
    const usuario = await Usuario.findById(idUsuario)
    return{
      cursos: usuario.carrito,
      statusCode: 200
    }
  } catch (error) {
    return {
      msg:'Error al obtener el carrito del usuario',
      statusCode: 500,
      error
     }
  }
}

const comprar = async (idUsuario) => {
  try {
    const usuario = await Usuario.findById(idUsuario)

    if (!usuario) {
      return {
        msg: "Usuario no encontrado",
        statusCode: 404
      };
    }
    if (!usuario.carrito || usuario.carrito.length === 0) {
      return {
        msg: "El carrito está vacío, no hay cursos para comprar",
        statusCode: 400
      };
    }
    
    usuario.cursos = usuario.cursos.concat(usuario.carrito);
    usuario.carrito = [];
    await usuario.save();
    
    return { 
      msg: "Operacion exitosa",
      statusCode: 200 
    };
  } catch (error) {
    return {
      msg:'Error. No pudo realizarce la operacion',
      statusCode: 500,
      error
     }
  }
}


module.exports= {
    listarUsuarios,
    obtenerUsuario,
    nuevoUsuario,
    inicioSesion,
    cambiarEstadoUsuario,
    editarUsuario,
    eliminarUsuario,
    obtenerCarrito,
    comprar
}
