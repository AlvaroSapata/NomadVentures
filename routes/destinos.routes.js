const express = require("express");
const router = express.Router();

const Destino = require("../models/viaje.model.js");
const User = require("../models/user.model.js");
const uploader = require("../middlewares/uploader.js");

//Requerir los middlewares
const {
  isLoggedIn,
  isAdmin,
  isGuia,
  isUsuario,
  isGuiaOrAdmin,
} = require("../middlewares/auth.middleware.js");

// GET "/destinos" => Renderizar la lista de destinos
router.get("/", (req, res, next) => {
  Destino.find({ isValidated: "aceptado" })

    .populate("lider")
    .select({ image: 1, title: 1, lider: 1, date: 1, price: 1 })
    .then((allDestines) => {
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
router.get("/crear", isLoggedIn, isGuiaOrAdmin, (req, res, next) => {
  res.render("destinos/crear-destino.hbs");
});

// POST "/destinos/crear" => Crea el formulario de destinos
router.post("/crear", uploader.single("image"), async (req, res, next) => {
  const { title, price, date, maxPeople, details, isValidated } = req.body;
  if (
    req.file === undefined ||
    title === undefined ||
    date === undefined ||
    details === undefined ||
    price === undefined ||
    maxPeople === undefined
  ) {
    res.render("destinos/crear-destino.hbs", {
      errorMessage: "Debes añadir todos los campos",
      title,
      price,
      date,
      maxPeople,
      details,
    });
    return;
  }

  try {
    await Destino.create({
      title,
      price,
      date,
      maxPeople,
      lider: req.session.loggedUser._id,
      details,
      image: req.file.path,
      isValidated,
    });
    res.redirect("/destinos");
  } catch (error) {
    next(error);
  }
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
router.get("/:destinoId/edit", isLoggedIn, isGuiaOrAdmin, (req, res, next) => {
  Destino.findById(req.params.destinoId)
    .then((destinoDetails) => {
      formatedDate = destinoDetails.date.toISOString().slice(0, 10);
      res.render("destinos/editar-destino.hbs", {
        destinoDetails,
        formatedDate,
      });
    })
    .catch((error) => {
      next(error);
    });
});

// POST "/destinos/:destinoId/edit" => Envia el formulario para editar detalles del destino
router.post("/:destinoId/edit", async (req, res, next) => {
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
        isValidated: "pendiente",
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
    if (req.file === undefined) {
      try {
        const destinoDetails = await Destino.findById(req.params.destinoId);

        res.render("destinos/editar-destino.hbs", {
          errorImageMessage:
            "Para actualizar la foto debes seleccionar un archivo",
          destinoDetails,
        });
      } catch (error) {
        next(error);
      }

      return;
    }
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

// POST "/destinos/mayorMenor" => ordena de mas caro a mas barato
router.post("/mayorMenor", (req, res, next) => {
  Destino.find({ isValidated: "aceptado" })
    .populate("lider")
    .select({ image: 1, title: 1, lider: 1, date: 1, price: 1 })
    .sort({ price: -1 })
    .then((allDestines) => {
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

// POST "/destinos/menorMayor" => ordena de mas barato a mas caro
router.post("/menorMayor", (req, res, next) => {
  Destino.find({ isValidated: "aceptado" })
    .populate("lider")
    .select({ image: 1, title: 1, lider: 1, date: 1, price: 1 })
    .sort({ price: 1 })
    .then((allDestines) => {
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

router.post("/:destinoId/join", async (req, res, next) => {
  try {
    const allDetails = await Destino.findById(req.params.destinoId).populate(
      "lider"
    );

    const formatDate = allDetails.date.toLocaleDateString("Sp-SP", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    if (allDetails.joinedPeople.length >= allDetails.maxPeople) {
      res.render("destinos/detalles-destino.hbs", {
        errorJoinMessage: "~ El viaje esta completo ~",
        allDetails,
        formatDate,
      });
    } else {
      try {
        const userDetails = await User.findByIdAndUpdate(
          req.session.loggedUser._id,
          { $addToSet: { viajesApuntado: req.params.destinoId } },
          { new: true }
        );

        const destinoDetails = await Destino.findByIdAndUpdate(
          req.params.destinoId,
          { $addToSet: { joinedPeople: req.session.loggedUser._id } },
          { new: true }
        );

        res.redirect("/profile");
      } catch (error) {
        next(error);
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
