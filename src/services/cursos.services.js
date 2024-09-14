const CursoModel = require('../models/cursos.schema')

const crearCurso = async () => {
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
      error,
  };
  }
}

module.exports = {
  crearCurso
}