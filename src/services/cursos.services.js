const cloudinary = require('../helpers/cloudinary');
const { configHeaderWhatsApp } = require('../helpers/meta');
const CursoModel = require('../models/cursos.schema')
const Usuario = require('../models/usuarios.schema')
const axios = require('axios');
const logger = require('../utils/logger');

const obtenerTodosLosCursos = async () => {
  try {
    const cursos = await CursoModel.find();
    return {
      cursos,
      statusCode: 200,
    }
  } catch (error) {
    return {
      msg: "Error al traer todos los cursos",
      statusCode: 500,
      error
    };
  }
}

const obtenerTodosLosCursosHabilitados = async () => {
  try {
    const cursos = await CursoModel.find({habilitado: true});
    return {
      cursos,
      statusCode: 200,
    }
  } catch (error) {
    return {
      msg: "Error al traer todos los cursos habilitados",
      statusCode: 500,
      error
    };
  }
}

const obtenerUnCurso = async (id) => {
  try {
    const curso = await CursoModel.findById(id);
    return {
      curso,
      statusCode: 200,
    }
  } catch (error) {
    return {
      msg: "Error al traer un curso",
      statusCode: 500,
      error,
    };
  }
}

const crearCurso = async (body) => {
  try {
    const curso = new CursoModel(body);
    await curso.save();
    return {
      msg: "Curso creado",
      statusCode: 201,
    }
  } catch (error) {
    return {
      msg: "Error al crear curso",
      statusCode: 500,
      error
    };
  }
}

const eliminarCurso = async (id) => {
  try {
    const curso = await CursoModel.findByIdAndDelete(id);
    if (!curso) {
      return { msg: "Curso no encontrado", statusCode: 404 };
    }
    return { msg: "Curso eliminado con exito!", statusCode: 200 };
  } catch (error) {
    return { msg: "Error al eliminar curso", statusCode: 500, error };
  }
};

const editarCurso = async (id, body) => {
  try {
    const curso = await CursoModel.findByIdAndUpdate(id, body, { new: true });
    if (!curso) {
      return {
        msg: "Curso no encontrado",
        statusCode: 404
      };
    }
    return {
      msg: "Curso actualizado con exito!",
      statusCode: 200,
    };
  } catch (error) {
    return {
      msg: "Error al editar curso",
      statusCode: 500,
      error
    };
  }
}

const agregarImagen = async (idCurso, file) => {
  try {
    const curso = await CursoModel.findById(idCurso)
    const imagen = await cloudinary.uploader.upload(file.path)
    curso.imagen = imagen.secure_url
    await curso.save()

    return {
      msg: 'Imagen cargada',
      statusCode: 200
    }
  } catch (error) {
    return {
      msg: "Error al cargar la imagen",
      statusCode: 500,
      error
    };
  }
}

const agregarEliminarCursoDelCarrito = async (idCurso, idUsuario) => {
  try {
    const curso = await CursoModel.findById(idCurso)
    const usuario = await Usuario.findById(idUsuario)

    if (!curso) {
      return {
        msg: "Curso no encontrado",
        statusCode: 404
      };
    }
    
    const cursoExiste = usuario.carrito.find((curso) => curso.id === idCurso)
    const cursoComprado = usuario.cursos.find((curso) => curso.id === idCurso)

    if(!cursoExiste) {
      if(!cursoComprado){
        if (!curso.habilitado) {
          return {
            msg: "Curso deshabilitado",
            statusCode: 500
          };
        }
        
        usuario.carrito.push({
          id: curso.id,
          nombre: curso.nombre,
          precio: curso.precio
        })
        await usuario.save()
  
        return {
          msg: "Curso agregado al carrito",
          statusCode: 200
        }
      } else {
        return {
          msg: "Ya tienes este curso",
          statusCode: 500
        };
      }
      
    } else {
      const posicionCurso = usuario.carrito.findIndex((curso) => curso.id === idCurso)
      logger.info(posicionCurso)
      usuario.carrito.splice(posicionCurso, 1)
      await usuario.save()
      
      return {
        msg: "Curso eliminado del carrito",
        statusCode: 200
      }
    }
  } catch (error) {
    return {
      msg: "Error al agregar/eliminar del carrito",
      statusCode: 500,
      error
    };
  }  
}

const cambiarEstadoCurso = async (idCurso) => {
  try {
    const curso = await CursoModel.findById(idCurso)
    curso.habilitado = !curso.habilitado

    await curso.save()

    if(curso.habilitado) {
      return {
        msg: 'Curso habilitado',
        statusCode: 200 
      }
    } else {
      return {
        msg: 'Curso deshabilitado',
        statusCode: 200 
      }
    }
  } catch (error) {
    return {    
      msg: "Error al cambiar el estado del curso",
      statusCode: 500,
      error
    };
  }
}

const mensajeWhatsApp = async() => {
  logger.info(process.env.META_MY_CEL)
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
}}

const puntuarCurso = async (idUsuario, idCurso, body) => {
  try {
    const curso = await CursoModel.findById(idCurso)
    const usuario = await Usuario.findById(idUsuario)

    if (!curso) {
      return {
        msg: "Curso no encontrado",
        statusCode: 404
      };
    }
    
    const cursoExiste = usuario.carrito.find((curso) => curso.id === idCurso)
    const cursoComprado = usuario.cursos.find((curso) => curso.id === idCurso)

    if(!cursoExiste) {
      if(cursoComprado){
        if (!curso.habilitado) {
          return {
            msg: "Curso deshabilitado",
            statusCode: 500
          };
        }
        if (!body.valoracion || body.valoracion < 1 || body.valoracion > 5) {
          return {
            msg: "Debes introducir una valoracion entre 1 y 5",
            statusCode: 500
          };
        }
        
        const posicionValoracion = curso.valoracion.findIndex((valoracion) => valoracion.idUsuario === idUsuario)

        if(posicionValoracion === -1){
          curso.valoracion.push({
            idUsuario: idUsuario,
            valoracion: body.valoracion
          })    
          await curso.save()
          return {
            msg: "Curso puntuado",
            statusCode: 200
          }
        } else {
          curso.valoracion[posicionValoracion].valoracion = body.valoracion
          curso.markModified('valoracion');
          await curso.save()
          return {
            msg: "Curso puntuado (modificando puntuacion)",
            statusCode: 200
          }
        }
      } else {
        return {
          msg: "Debes haber comprado el curso para poder puntuarlo",
          statusCode: 500
        };
      }
      
    } else {
      return {
        msg: "El curso no existe",
        statusCode: 200
      }
    }
  } catch (error) {
    console.log(error)
    return {
      msg: "Error al puntuar curso",
      statusCode: 500,
      error
    };
  }  
}

const obtenerTodasLasValoraciones = async (idCurso) => {
  try {
    const curso = await CursoModel.findById(idCurso)

    if (!curso) {
      return {
        msg: "Curso no encontrado",
        statusCode: 404
      };
    }

    return {
      valoraciones: curso.valoracion,
      statusCode: 200,
    }
  } catch (error) {
    return {
      msg: "Error al traer todas las valoraciones",
      statusCode: 500,
      error
    };
  }
}

const obtenerValoracionGeneral = async (idCurso) => {
  try {
    const curso = await CursoModel.findById(idCurso)

    if (!curso) {
      return {
        msg: "Curso no encontrado",
        statusCode: 404
      };
    }

    if (curso.valoracion.length === 0) {
      return {
        msg: "El curso no tiene valoraciones",
        valoracion: 0,
        statusCode: 200
      };
    }

    let totalValoracion = 0;

    for (let i = 0; i < curso.valoracion.length; i++) {
      totalValoracion += curso.valoracion[i].valoracion;
    }

    const promedioValoracion = totalValoracion / curso.valoracion.length;

    return {
      msg: `El curso tiene ${curso.valoracion.length} valoraciones`,
      valoracion: Number(promedioValoracion.toFixed(2)),
      statusCode: 200
    };
  } catch (error) {
    return {
      msg: "Error al traer todas las valoraciones",
      statusCode: 500,
      error
    };
  }
}

module.exports = {
  obtenerTodosLosCursos,
  obtenerUnCurso,
  crearCurso,
  eliminarCurso,
  editarCurso,
  agregarImagen,
  agregarEliminarCursoDelCarrito,
  cambiarEstadoCurso,
  obtenerTodosLosCursosHabilitados,
  mensajeWhatsApp,
  puntuarCurso,
  obtenerTodasLasValoraciones,
  obtenerValoracionGeneral
}
