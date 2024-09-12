const { Schema, model } = require('mongoose')

const CursosSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del curso es obligatorio"],
    trim: true,
    minLength: [5, "El nombre del curso debe tener al menos 5 caracteres"],
    maxLength: [70, "El nombre del curso debe tener como máximo 70 caracteres"]
  },
  imagen: {
    type: String,
    match: [/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/, "La URL de la imagen debe ser válida y en formato jpg, jpeg, png o gif"]
  },
  descripcion: {
    type: String,
    required: [true, "La descripción del curso es obligatorio"],
    trim: true,
    minlength: [10, "La descripción del curso debe tener al menos 15 caracteres"],
    maxLength: [70, "La descripción del curso debe tener como máximo 70 caracteres"]
  },
  contenido: {

  },
  tecnologias: {

  },
  duracion: {

  },
  precio: {

  },
  alumnos: {

  },
  valoracion: {

  },
  habilitado: {

  },
})