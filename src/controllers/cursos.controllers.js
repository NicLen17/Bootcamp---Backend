serviciosDeCursos = require('../services/cursos.services')


const obtenerTodosLosCursos = async (req, res) => {
    const result = await serviciosDeCursos.obtenerTodosLosCursos()
    if (result.statusCode === 200) {
        res.status(200).json(result.cursos)
    } else {
        res.status(500).json({ msg: result.msg })
    }
}

const obtenerTodosLosCursosHabilitados = async (req, res) => {
    const result = await serviciosDeCursos.obtenerTodosLosCursosHabilitados()
    if (result.statusCode === 200) {
        res.status(200).json(result.cursos)
    } else {
        res.status(500).json({ msg: result.msg })
    }
}

const obtenerUnCurso = async (req, res) => {
    const result = await serviciosDeCursos.obtenerUnCurso(req.params.idCurso)
    if (result.statusCode === 200) {
        res.status(200).json(result.curso)
    } else {
        res.status(500).json({ msg: result.msg })
    }
}

const crearCurso = async (req, res) => {
    const result = await serviciosDeCursos.crearCurso(req.body)
    if (result.statusCode === 201) {
        res.status(201).json({ msg: result.msg })
    } else {
        res.status(500).json({ msg: result.msg })
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
        res.status(500).json({ msg: result.msg })
    }
}

const agregarImagenCurso = async (req, res) => {
    const result = await serviciosDeCursos.agregarImagen(req.params.idCurso, req.file)
    if (result.statusCode === 200) {
        res.status(200).json({ msg: result.msg })
    } else {
        res.status(500).json({ msg: result.msg })
    }
}

const agregarEliminarCursoCarrito = async (req, res) => {
    const result = await serviciosDeCursos.agregarEliminarCursoDelCarrito(req.params.idCurso, req.idUsuario)
    if (result.statusCode === 200) {
        res.status(200).json({ msg: result.msg })
    } else {
        res.status(500).json({ msg: result.msg })
    }
}

const cambiarEstadoCurso = async (req, res) => {
    const result = await serviciosDeCursos.cambiarEstadoCurso(req.params.idCurso)

    if (result.statusCode === 200) {
        res.status(200).json({ msg: result.msg })
    } else {
        res.status(500).json({ msg: result.msg })
    }
}

const whatsAppApi = async (req, res) => {
    const result = await serviciosDeCursos.mensajeWhatsApp()
    if (result.statusCode === 200) {
        res.status(200).json({ msg: result.msg })
    } else {
        res.status(500).json({ msg: result.msg })
    }
}

module.exports = {
    obtenerTodosLosCursos,
    obtenerUnCurso,
    crearCurso,
    eliminarCurso,
    editarCurso,
    agregarImagenCurso,
    agregarEliminarCursoCarrito,
    cambiarEstadoCurso,
    obtenerTodosLosCursosHabilitados,
    whatsAppApi
}