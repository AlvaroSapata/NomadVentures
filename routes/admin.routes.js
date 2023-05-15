const express = require("express");
const router = express.Router();

const Destino = require("../models/viaje.model.js");

// GET "/admin/validate" => Renderizar la lista de destinos
router.get("/validate", (req, res, next) => {
    Destino.find()
      .populate("lider")
      .select({ image: 1, title: 1, lider: 1, date: 1 })
      .then((allDestines) => {
        console.log(allDestines);
        allDestines.forEach((eachDestino) => {
          eachDestino.formatedDate = eachDestino.date.toLocaleDateString(
            "Sp-SP",
            { weekday: "long", year: "numeric", month: "short", day: "numeric" }
          );
        });
        res.render("admin/lista-destinos-validar.hbs", {
          allDestines,
        });
      })
      .catch((error) => {
        next(error);
      });
  });

// GET "/admin/:destinoId/validate" => Detalles del destino
router.get("/:destinoId/validate", (req, res, next) => {
  Destino.findById(req.params.destinoId)
    .populate("lider")
    .then((allDetails) => {
      const formatDate = allDetails.date.toLocaleDateString("Sp-SP", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      console.log(allDetails);
      res.render("admin/detalles-destino-validar.hbs", {
        allDetails,
        formatDate,
      });
    })
    .catch((error) => {
      next(error);
    });
});


module.exports = router;