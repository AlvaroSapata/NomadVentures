const express = require("express");
const router = express.Router();

const Destino = require("../models/viaje.model.js");
const User = require("../models/user.model.js");
const uploader = require("../middlewares/uploader.js");

// GET "/profile" => Renderiza la vista del perfil
router.get("/", async (req, res, next) => {
  try {
    // Buscar todos los destinos
    const allDestines = await Destino.find({
      lider: req.session.infoSesionUser._id,
    });

    /* console.log("allDestines: ", allDestines); */

    res.render("profile/profile.hbs", {
      allDestines,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
