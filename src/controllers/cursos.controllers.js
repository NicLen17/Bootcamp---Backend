serviciosDeCursos = require('../services/cursos.services')

const obtenerTodosLosCursos = async (req, res) => {
    const result = await serviciosDeCursos.obtenerTodosLosCursos()
    console.log(result)
    if (result.statusCode === 200){
        res.status(200).json(result.cursos)
    } else {
        res.status(500).json({msg: result.msg})
    }
}

module.exports = {
  obtenerTodosLosCursos
}