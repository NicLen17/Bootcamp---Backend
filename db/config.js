const mongoose = require('mongoose')

try {
  mongoose.connect(process.env.MONGODB_CONNECT).then(() => console.log('DB conectada con exito!'))
} catch (error) {
  console.log(error)
}

module.exports = mongoose