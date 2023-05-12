const { Schema, model } = require("mongoose");

const destinoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  maxPeople: {
    type: Number,
    required: true,
  },
  lider: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Destino = model("Destino", destinoSchema);

module.exports = Destino;
