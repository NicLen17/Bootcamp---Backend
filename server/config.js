require('../db/config')
const express = require('express')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const logger = require('../src/utils/logger')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerSpec = require('../src/helpers/swagger')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 8080
    this.middleware()
  }

  middleware() {
    this.app.use(express.json())
    this.app.use(express.static(path.join(__dirname, '../public')))
    this.app.use(cors())
    this.app.use(morgan('dev'))
    this.app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))
  }


  listen() {
    this.app.listen(this.port, () => {
      logger.info('Server iniciado en el puerto', this.port)
    })
  }
}

module.exports = Server