require('dotenv').config()
const Server = require('./server/config')
const server = new Server()

server.listen()