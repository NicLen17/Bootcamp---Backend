import mongoose from "mongoose";


const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    minLength: 4,
    maxLength: 20,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50,
    minlength: 10,
    validate: {
      validator: (value) => {
        const pattern =
          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
        return pattern.test(value);
      },
      message: "Por favor, introduce un correo válido",
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  bloqueado: {
    type: Boolean,
    default: false,
  },
  rol: {
    type: String,
    enum: ["admin", "usuario"],
    default: "usuario",
  },
  carrito: {
    type: [String],
    default: []
  },
  cursos:{
    type: [String],
    default: []
  }

});

const Usuario = mongoose.model("usuario", usuarioSchema);

module.exports = Usuario;
