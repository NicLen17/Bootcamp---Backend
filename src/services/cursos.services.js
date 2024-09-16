const CursoModel = require('../models/cursos.schema')


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
      error,
  };
  }
}

module.exports = {
  obtenerUnCurso,
  crearCurso
}