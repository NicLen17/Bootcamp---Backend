const serviceUsuario = require('../services/usuarios.services')


const listarUsuarios = async (req, res) => {
  const result = await serviceUsuario.listarUsuarios()
   
  if(result.statusCode === 200){
   res.status(200).json({usuarios: result.usuarios, msg: result.msg})
  }else{
   res.status(500).json({msg: result.msg})
  }
  }

  const obtenerUsuario = async (req, res) => {
    const result = await serviceUsuario.obtenerUsuario(req.params.idUsuario)
  
    if(result.statusCode === 200){
      res.status(200).json({usuario: result.usuario, msg: result.msg})
     }else{
      res.status(500).json({msg: result.msg})
     }
  
  }

module.exports = {
    listarUsuarios,
    obtenerUsuario
}