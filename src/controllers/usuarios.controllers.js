const serviceUsuario = require('../services/usuarios.services')
const listarUsuarios = async (req, res) => {
    try {
      const usuarios = await serviceUsuario.listarUsuarios()
      res.status(200).json(usuarios)
    } catch (error) {
      console.log(error)
    }
  }


module.exports = {
    listarUsuarios
}