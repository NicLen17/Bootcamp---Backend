const path = require('path')
const components = require('./components.json')
const paths = require('./paths.json')

const swaggerSpec = {
  definition: {
    openapi: '3.1.0',
    info: {
      "title": "Proyecto Back1 - Sistema de cursos",
      "summary": "API de gestion de sistema de cursos.",
      "description": "Este es un servidor con el cual podemos gestionar un sistema de cursos (cursos, usuarios).",
      "version": "1.0.0"
    },
    servers: [
      {
        url: 'http://localhost:8080'
      }
    ],
    components: components,
    paths: paths
  },
  apis: [`${path.join(__dirname, '../routes/*')}`]
}

module.exports = swaggerSpec