require('../db/config')
const express = require('express')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const logger = require('../src/utils/logger')

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
  }


  listen() {
    this.app.listen(this.port, () => {
      logger.info('Server iniciado en el puerto', this.port)
    })
  }
}

module.exports = Server