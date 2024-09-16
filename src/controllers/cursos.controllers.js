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

const obtenerUnCurso = async (req, res) => {
    const result = await serviciosDeCursos.obtenerUnCurso(req.params.idCurso)
    if (result.statusCode === 200){
        res.status(200).json(result.curso)
    } else {
        res.status(500).json({msg: result.msg})
    }
}

const crearCurso = async (req, res) => {
    const result = await serviciosDeCursos.crearCurso(req.body)
    if (result.statusCode === 201){
        res.status(201).json({msg: result.msg})
    } else {
        res.status(500).json({msg: result.msg})
    }
}

const eliminarCurso = async (req, res) => {
    const id = req.params.idCurso
    const result = await serviciosDeCursos.eliminarCurso(id)
    if (result.statusCode === 200) {
        res.status(200).json({ msg: result.msg })
    } else {
        res.status(500).json({ msg: result.msg })
    }
}

const editarCurso = async (req, res) => {
    const id = req.params.idCurso
    const result = await serviciosDeCursos.editarCurso(id, req.body)
    if (result.statusCode === 200) {
        res.status(200).json({ msg: result.msg })
    } else {
        res.status(result.statusCode).json({ msg: result.msg })
    }
}

module.exports = {
  obtenerTodosLosCursos,
  obtenerUnCurso,
  crearCurso,
  eliminarCurso,
  editarCurso   
}