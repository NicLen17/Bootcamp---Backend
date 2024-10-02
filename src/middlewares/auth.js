const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')

module.exports = (rol) => (req, res, next) => {
  try {
    const token = req.header('auth')

    if(!token){
      return res.status(401).json({msg: 'No estas autorizado'})
    }

    const verificarToken = jwt.verify(token, process.env.JWT_SECRET)
    if(verificarToken.rol === rol){
      req.idUsuario = verificarToken.idUsuario
      next()
    }else{
      return res.status(403).json({msg: 'No tienes el permiso suficiente'})
    }
  } catch (error) {
    logger.error(error)
  }
}