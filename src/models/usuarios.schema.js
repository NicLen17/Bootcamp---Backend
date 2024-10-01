const mongoose = require("mongoose");


const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    trim: true,
    minLength: 4,
    maxLength: 20,
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "El correo es obligatorio"],
    unique: [true, "Este correo ya está registrado"],
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
    required: [true, "La contraseña es obligatoria"],
    trim: true,
    minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    maxlength: [75, "La contraseña no debe exceder los 75 caracteres"],
    validate: {
      validator: (value) => {
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,75}$/;
        return passwordPattern.test(value);
      },
      message: "La contraseña debe contener al menos una letra, un número y un símbolo",
    },
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
    type: [],
    default: []
  },
  cursos:{
    type: [],
    default: []
  }

});

usuarioSchema.methods.toJSON = function(){
  const { password, ...usuario } = this.toObject()
  return usuario
}

const Usuario = mongoose.model("usuario", usuarioSchema);

module.exports = Usuario;
