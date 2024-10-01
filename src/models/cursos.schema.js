const { Schema, model } = require('mongoose')

const CursosSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del curso es obligatorio'],
    unique: [true, 'El nombre del curso debe ser único'],
    trim: true,
    minLength: [5, 'El nombre del curso debe tener al menos 5 caracteres'],
    maxLength: [70, 'El nombre del curso debe tener como máximo 70 caracteres']
  },
  imagen: {
    type: String,
    match: [/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/, 'La URL de la imagen debe ser válida y en formato jpg, jpeg, png o gif']
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción del curso es obligatorio'],
    trim: true,
    minLength: [10, 'La descripción del curso debe tener al menos 15 caracteres'],
    maxLength: [70, 'La descripción del curso debe tener como máximo 70 caracteres']
  },
  contenido: {
    type: [String],
    validate: {
      validator: function(array) {
        return array.every(url => /^https?:\/\/.+\.(mp4|mov|avi|mkv|flv)$/.test(url));
      },
      message: 'Cada URL de video debe ser válida y en formato mp4, mov, avi, mkv o flv'
    }
  },
  tecnologias: {
    type: [String],
    required: true,
    validate: {
      validator: function(array) {
        return array.every(tecnologia => tecnologia.length >= 1 && tecnologia.length <= 15);
      },
      message: 'Cada tecnología debe tener entre 1 y 15 caracteres'
    }
  },
  duracion: {
    type: Number,
    min: [1, "La duración mínima del curso es 1 hora"],
    max: [1000, "La duración máxima del curso es 1000 horas"]
  },
  precio: {
    type: Number,
    required: true,
    validate: {
      validator: function(precio) {
        return precio >= 0;
      },
      message: "El precio debe ser mayor o igual a 0"
    }
  },
  alumnos: {
    type: [String],
    default: []
  },
  valoracion: {
    type: [Number],
    validate: {
      validator: function(array) {
        return array.every(valoracion => valoracion >= 0 && valoracion <= 5);
      },
      message: "Cada valoración debe estar entre 0 y 5"
    },
    default: []
  },
  habilitado: {
    type: Boolean,
    default: true
  },
})

const CursoModel = model('cursos', CursosSchema)
module.exports = CursoModel