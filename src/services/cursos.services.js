const CursoModel = require('../models/cursos.schema')

const crearCurso = async () => {
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
  crearCurso
}