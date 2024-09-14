serviciosDeCursos = require('../services/cursos.services')

const obtenerUnCurso = async (req, res) => {
    const result = await serviciosDeCursos.obtenerUnCurso(req.params.idCurso)
    console.log(result)
    if (result.statusCode === 200){
        res.status(200).json(result.curso)
    } else {
        res.status(500).json({msg: result.msg})
    }
}

module.exports = {
  obtenerUnCurso
}