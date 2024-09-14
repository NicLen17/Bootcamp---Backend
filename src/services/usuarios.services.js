const UsuarioModel = require("../models/usuarios.schema")
const listarUsuarios = async () => {
    try {
      const usuarios = await UsuarioModel.find()
      return usuarios
    } catch (error) {
      console.log(error)
    }
  }



module.exports= {
    listarUsuarios
}