const Usuario = require("../models/usuarios.schema")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { registroUsuario, bajaUsuario, recuperoContraseniaUsuario, pagoProductosUsuario } = require("../helpers/mensajes")
const { MercadoPagoConfig, Preference } = require("mercadopago")
const CursoModel = require('../models/cursos.schema')
const logger = require("../utils/logger")

const nuevoUsuario = async (body) => {
  try {
    delete body.carrito
    delete body.cursos

    const usuarioExiste = await Usuario.findOne({ nombre: body.nombre })
    const emailExiste = await Usuario.findOne({ email: body.email });

    if (usuarioExiste) {
      return {
        msg: 'El nombre de usuario no esta disponible',
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
      msg: 'Usuario creado',
      statusCode: 201
    }
  } catch (error) {
    return {
      msg: 'Error al crear el usuario',
      statusCode: 500,
      error
    }
  }
}

const inicioSesion = async (body) => {
  const usuarioExiste = await Usuario.findOne({ nombre: body.nombre })
  if (!usuarioExiste) {
    return {
      msg: 'Usuario y/o contraseña incorrecto.(U)',
      statusCode: 400
    }
  }

  const checkContrasenia = bcrypt.compareSync(body.password, usuarioExiste.password)

  if (!checkContrasenia) {
    return {
      msg: 'Usuario y/o contraseña incorrecto.(C)',
      statusCode: 400
    }
  }

  const payload = {
    idUsuario: usuarioExiste._id,
    rol: usuarioExiste.rol,
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET)

  return {
    token,
    rol: usuarioExiste.rol,
    idUsuario: usuarioExiste._id,
    msg: 'Usuario logueado',
    statusCode: 200
  }

}

const listarUsuarios = async () => {
  try {
    const usuarios = await Usuario.find()
    return {
      usuarios,
      statusCode: 200
    }
  } catch (error) {
    return {
      msg: 'Error al obtener los usuarios',
      statusCode: 500,
      error
    }
  }
}

const obtenerUsuario = async (idUsuario) => {
  try {
    const usuario = await Usuario.findById(idUsuario)
    return {
      usuario,
      statusCode: 200
    }
  } catch (error) {
    return {
      msg: 'Error al obtener el usuario',
      statusCode: 500,
      error
    }
  }
}
const cambiarEstadoUsuario = async (idUsuario, idUsuarioToken) => {
  try {
    if (idUsuario !== idUsuarioToken) {
      const usuario = await Usuario.findById(idUsuario)
      if (usuario.rol !== 'admin') {
        usuario.bloqueado = !usuario.bloqueado

        await usuario.save()

        if (usuario.bloqueado) {
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

    if (Object.keys(body).length === 0) {
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
      const usuarioDatos = await Usuario.findById(id)
      const usuario = await Usuario.findByIdAndDelete(id);
      await bajaUsuario(usuarioDatos.nombre, usuarioDatos.email); //Llamado a nodemailer
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
        msg: 'No puedes eliminar tu propio usuario',
        statusCode: 500
       }
    }

  } catch (error) {
    logger.error(error)
    return { msg: "Error al eliminar el usuario", statusCode: 500, error };
  }
};

const obtenerCarrito = async (idUsuario) => {
  try {
    const usuario = await Usuario.findById(idUsuario)

    if (!usuario) {
      return {
        msg: "Usuario no encontrado",
        statusCode: 404
      };
    }

    return {
      cursos: usuario.carrito,
      statusCode: 200
    }
  } catch (error) {
    return {
      msg: 'Error al obtener el carrito del usuario',
      statusCode: 500,
      error
    }
  }
}

const comprar = async (idUsuario) => {
  try {
    const usuario = await Usuario.findById(idUsuario)
    const client = new MercadoPagoConfig({ accessToken: process.env.MP_TOKEN })
    const preference = new Preference(client)

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

    const items = usuario.carrito.map((curso) => ({
      title: curso.nombre,
      quantity: 1,
      unit_price: curso.precio,
      currency_id: "ARS",
    }));

    const resultMp = await preference.create({
      body: {
        items: items,
        back_urls: {
          success: 'https://ceba-mate.vercel.app/',
          failure: 'https://ceba-mate.vercel.app/#/contact',
          pending: 'https://ceba-mate.vercel.app/#/contact'
        },
        auto_return: 'approved'
      }
    })

    await pagoProductosUsuario(usuario.nombre, usuario.email, items); //Llamado a nodemailer

    for (const curso of usuario.carrito) {
      const cursoDb = await CursoModel.findById(curso.id);
      if (cursoDb) {
        if (!cursoDb.alumnos.includes(idUsuario)) {
          cursoDb.alumnos.push(idUsuario);
          await cursoDb.save();
        }
      }
    }

    usuario.cursos = usuario.cursos.concat(usuario.carrito);
    usuario.carrito = [];
    await usuario.save();

    return {
      resultMp,
      msg: "Operacion exitosa!",
      statusCode: 200
    };
  } catch (error) {
    return {
      msg: 'Error. No pudo realizarce la operacion',
      statusCode: 500,
      error
    }
  }
}

const obtenerCursosUsuario = async (idUsuario) => {
  try {
    const usuario = await Usuario.findById(idUsuario)

    if (!usuario) {
      return {
        msg: "Usuario no encontrado",
        statusCode: 404
      };
    }

    return {
      cursos: usuario.cursos,
      statusCode: 200
    }
  } catch (error) {
    return {
      msg: 'Error al obtener los cursos del usuario',
      statusCode: 500,
      error
    }
  }
}

const mensajeWhatsApp = async() => {
  logger.debug(process.env.META_MY_CEL)
  const result = await axios.post(`https://graph.facebook.com/v20.0/${process.env.META_ID_CEL}/messages`, {
    messaging_product: 'whatsapp',
    to: `${process.env.META_MY_CEL}`,
    type: 'template',
    template:{
      name:'hello_world',
      language: {
        code: 'en_US'
      }
    }
  },
  configHeaderWhatsApp
  )
  if(result.status === 200){
    return {
      msg: 'Mensaje enviado!',
      statusCode: 200
    }
  }
  if(result.status === 400){
    return {
      msg: 'Error al enviar el mensaje!',
      statusCode: 500
    }
  }
}  

const forgotPassword = async (email) => {
  try {
    const user = await Usuario.findOne({ email });
    if (!user) {
      return {
        msg: 'No se encontró un usuario con ese correo',
        statusCode: 400
      };
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    await user.save();

    await recuperoContraseniaUsuario(email, token); // Enviar el correo

    return {
      msg: 'Correo de recuperación enviado!',
      statusCode: 200,
      token
    };
  } catch (error) {
    return {
      msg: 'Error en el envio de mail de recuperacion',
      statusCode: 500,
      error
    };
  }
};


const resetPassword = async (password, token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Usuario.findOne({ _id: decoded.id, resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

    if (!user) {
      return {
        msg: 'Token inválido o ha expirado',
        statusCode: 400
      };
    }

    let salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return {
      msg: 'Contraseña restablecida con éxito!',
      statusCode: 200
    };
  } catch (error) {
    return {
      msg: 'Error en cambio de contraseña',
      statusCode: 500,
      error
    };
  }
};

module.exports = {
  listarUsuarios,
  obtenerUsuario,
  nuevoUsuario,
  inicioSesion,
  cambiarEstadoUsuario,
  editarUsuario,
  eliminarUsuario,
  obtenerCarrito,
  comprar,
  obtenerCursosUsuario,
  forgotPassword,
  resetPassword,
  mensajeWhatsApp
}
