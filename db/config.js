const mongoose = require('mongoose')
const logger = require('../src/utils/logger')

try {
  mongoose.connect(process.env.MONGODB_CONNECT).then(() => logger.info('DB conectada con exito!'))
} catch (error) {
  logger.error(error)
}

module.exports = mongoose