const cloudinary = require('../helpers/cloudinary');
const CursoModel = require('../models/cursos.schema')
const Usuario = require('../models/usuarios.schema')

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
    
    const cursoExiste = usuario.carrito.find((curso) => curso._id.toString() === idCurso)

    if(!cursoExiste) {
      usuario.carrito.push(curso)
      await usuario.save()

      return {
        msg: "Curso agregado al carrito",
        statusCode: 200
      }
    } else {
      const posicionCurso = usuario.carrito.findIndex((curso) => curso._id.toString() === idCurso)
      
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

module.exports = {
  obtenerTodosLosCursos,
  obtenerUnCurso,
  crearCurso,
  eliminarCurso,
  editarCurso,
  agregarImagen,
  agregarEliminarCursoDelCarrito,
  cambiarEstadoCurso,
  obtenerTodosLosCursosHabilitados
}