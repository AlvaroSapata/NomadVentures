const express = require("express");
const router = express.Router();

const Destino = require("../models/viaje.model.js");
const User = require("../models/user.model.js");
const uploader = require("../middlewares/uploader.js");

//todo : que no de fallo al pulsar / DOM visibilidad del boton
/* const UpdateBtnDOM = document.querySelector() */

// GET "/destinos" => Renderizar la lista de destinos
router.get("/", (req, res, next) => {
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
      res.render("destinos/lista-destinos.hbs", {
        allDestines,
      });
    })
    .catch((error) => {
      next(error);
    });
});

// GET "/destinos/crear" => Renderiza el formulario de destinos
router.get("/crear", (req, res, next) => {
  console.log("ES ESTEE", req.file);
  res.render("destinos/crear-destino.hbs");
});

// POST "/destinos/crear" => Crea el formulario de destinos
router.post("/crear", uploader.single("image"), async (req, res, next) => {
  console.log(req.session.infoSesionUser);
  const { title, price, date, maxPeople, details, isValidated } = req.body;
  if (req.file === undefined) {
    next("no hay imagen");
    return;
  }
  try {
    await Destino.create({
      title,
      price,
      date,
      maxPeople,
      lider: req.session.infoSesionUser._id,
      details,
      image: req.file.path,
      isValidated,
    });
    res.redirect("/destinos");
  } catch (error) {
    next(error);
  }

  //   res.render("destinos/crear-destino.hbs");
});

// GET "/destinos/:destinoId" => Detalles del destino
router.get("/:destinoId", (req, res, next) => {
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
      res.render("destinos/detalles-destino.hbs", {
        allDetails,
        formatDate,
      });
    })
    .catch((error) => {
      next(error);
    });
});

// GET "/destinos/:destinoId/edit" => crea el formulario para editar detalles del destino
router.get("/:destinoId/edit", (req, res, next) => {
  Destino.findById(req.params.destinoId)
    .then((destinoDetails) => {
      console.log(destinoDetails);
      res.render("destinos/editar-destino.hbs", {
        destinoDetails,
      });
    })
    .catch((error) => {
      next(error);
    });
});

// POST "/destinos/:destinoId/edit" => Envia el formulario para editar detalles del destino
router.post("/:destinoId/edit", async (req, res, next) => {
  console.log("los body", req.body);
  try {
    const { title, price, date, maxPeople, details, image } = req.body;
    const response = await Destino.findByIdAndUpdate(
      req.params.destinoId,
      {
        title,
        price,
        date,
        maxPeople,
        details,
      },
      { new: true }
    );
    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
});

// POST "/destinos/:destinoId/edit/image" => Envia el formulario para editar detalles del destino
router.post(
  "/:destinoId/edit/image",
  uploader.single("image"),
  async (req, res, next) => {
    //todo : que no de fallo al pulsar / DOM visibilidad del boton
    // if (req.file === undefined) {
    //   res.render("destinos/editar-destino.hbs", {
    //     errorImageMessage: "todo mal"
    //     ,})
    //   /* next("no hay imagen"); */
    // return;}
    try {
      const response = await Destino.findByIdAndUpdate(
        req.params.destinoId,
        {
          image: req.file.path,
        },
        { new: true }
      );
      res.redirect(`/destinos/${req.params.destinoId}/edit`);
    } catch (error) {
      next(error);
    }
  }
);

// POST "/destinos/:destinoId/delete" => Borra un Destino de la DB
router.post("/:destinoId/delete", (req, res, next) => {
  Destino.findByIdAndDelete(req.params.destinoId)
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
