const Usuario = require("../models/usuarios.schema")
const listarUsuarios = async () => {
    try {
      const usuarios = await Usuario.find()
      return usuarios
    } catch (error) {
      console.log(error)
    }
  }



module.exports= {
    listarUsuarios
}