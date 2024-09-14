serviciosDeCursos = require('../services/cursos.services')

const crearCurso = async (req, res) => {
    const result = await serviciosDeCursos.crearCurso(req.body)

    if (result.statusCode === 201){
        res.status(201).json({msg: result.msg})
    } else {
        res.status(500).json({msg: result.msg})
    }
}

module.exports = {
  crearCurso
}