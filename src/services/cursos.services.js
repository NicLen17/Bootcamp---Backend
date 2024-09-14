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

module.exports = {
  obtenerUnCurso
}