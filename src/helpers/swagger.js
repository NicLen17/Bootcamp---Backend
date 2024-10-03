const path = require('path')
const components = require('./components.json')
const paths = require('./paths.json')

const swaggerSpec = {
  definition: {
    openapi: '3.1.0',
    info: {
      "title": "Proyecto Back1 - Sistema de cursos",
      "summary": "API de gestion de sistema de cursos.",
      "description": "Este servidor está diseñado para gestionar un servicio de cursos, permitiendo tanto la administración como la interacción de usuarios finales. Desarrollado con Node.js y MongoDB, implementa una API que facilita las siguientes funcionalidades: \n\n- Gestión de cursos: Los administradores pueden crear, leer, actualizar y eliminar (CRUD) cursos. Cada curso puede incluir una imagen, descripción y valoraciones de los usuarios. \n\n- Gestión de usuarios: Soporte para CRUD de usuarios, con funcionalidades de registro y login. Los usuarios pueden agregar cursos a su carrito, realizar compras e interactuar con el sistema de valoraciones. \n\n- Autenticación: Uso de JWT (JSON Web Tokens) para asegurar las rutas y proteger los datos de los usuarios. \n\n- Roles: Diferenciación de roles entre administradores, que tienen acceso a la administración completa del sistema, y usuarios, que pueden interactuar con los cursos y realizar compras. \n\n- Procesamiento de pagos: Integración con Mercado Pago para gestionar de manera segura las transacciones de compra de cursos. \n\n- Almacenamiento de imágenes: Uso de Cloudinary para el almacenamiento y gestión de imágenes de cursos. \n\n- Notificaciones: Implementación de envío de correos electrónicos transaccionales a través de Nodemailer, como confirmaciones de compra y notificaciones de registro. \n\n- Middleware: Incluye Multer para la gestión de archivos subidos, bcrypt para el manejo seguro de contraseñas, y Axios para las peticiones HTTP. \n\n- Base de datos: Uso de Mongoose para la creación de modelos y la interacción con MongoDB.",
      "version": "1.0.0"
    },
    servers: [
      {
        url: 'https://bootcamp-backend-f796.onrender.com/',
        description: "Servidor en la nube"
      },
      {
        url: 'http://localhost:8080',
        description: "Servidor en local"
      }
    ],
    components: components,
    paths: paths
  },
  apis: [`${path.join(__dirname, '../routes/*')}`]
}

module.exports = swaggerSpec