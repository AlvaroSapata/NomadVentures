const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  rol: {
    type: String,
    enum: ["guia", "usuario", "admin"],
    default: "usuario",
  },

  image: {
    type: String,
  },
  viajesApuntado: {
    type: [Schema.Types.ObjectId],
    ref: "Destino",
  },
});

const User = model("User", userSchema);

module.exports = User;
