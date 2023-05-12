const express = require("express");
const router = express.Router();

const Destino = require("../models/viaje.model.js");
const User = require("../models/user.model.js");

// GET "/destinos" => Renderizar la lista de destinos
router.get("/", (req, res, next) => {
  res.render("destinos/lista-destinos.hbs");
});

// GET "/destinos/crear" => Renderiza el formulario de destinos
router.get("/crear", (req, res, next) => {
  res.render("destinos/crear-destino.hbs");
});

// POST "/destinos/crear" => Crea el formulario de destinos
router.post("/crear", async (req, res, next) => {
    console.log(req.session.infoSesionUser);
  //todo lider vinculado al usuario logueado
  const { title, price, date, maxPeople, lider, details, image } = req.body;
  try {
    await Destino.create({
      title,
      price,
      date,
      maxPeople,
      lider: req.session.infoSesionUser._id,
      details,
      image,
    });

    res.redirect("destinos/lista-destinos.hbs");
  } catch (error) {
    next(error);
  }

  //   res.render("destinos/crear-destino.hbs");
});
module.exports = router;
