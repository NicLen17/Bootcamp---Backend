require('dotenv').config()
const Server = require('./server/config')
const server = new Server()

server.app.use('/api', require('./src/routes/index.routes'))

server.listen()