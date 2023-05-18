const express = require("express");
const router = express.Router();

const Destino = require("../models/viaje.model.js");
const User = require("../models/user.model.js");
const uploader = require("../middlewares/uploader.js");
const {
  isLoggedIn,
  isAdmin,
  isGuia,
  isUsuario,
  isGuiaOrAdmin,
} = require("../middlewares/auth.middleware.js");

// GET "/profile" => Renderiza la vista del perfil
router.get("/",isLoggedIn, async (req, res, next) => {
  try {
    // Buscar todos los destinos del usuario logueado
    const allDestines = await Destino.find({
      lider: req.session.loggedUser._id,
    }).populate("lider");
    // Buscar la info del usuario
    const userDetails = await User.findById(req.session.loggedUser._id)
    .populate("viajesApuntado");
    userDetails.viajesApuntado.forEach((eachDestino)=>{
      eachDestino.formatedDate = eachDestino.date.toLocaleDateString(
        "Sp-SP",
        { weekday: "long", year: "numeric", month: "short", day: "numeric" }
      );
    })
    res.render("profile/profile.hbs", {
      allDestines,
      userDetails,
      isUserLoggedAsUsuario:res.locals.isUserLoggedAsUsuario,
    });
  } catch (error) {
    next(error);
  }
});



// GET "/profile/:userId/edit" => crea el formulario para editar detalles del usuario
router.get("/:userId/edit",isLoggedIn, (req, res, next) => {
  User.findById(req.params.userId)
    .then((userDetails) => {

      res.render("profile/editar-profile.hbs", {
        userDetails,
      });
    })
    .catch((error) => {
      next(error);
    });
});

// POST "/profile/:userId/edit" => Envia el formulario para editar detalles del usuario
router.post("/:userId/edit", async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    const response = await User.findByIdAndUpdate(
      req.params.userId,
      {
        firstName,
        lastName,
        email,
        phone,
      },
      { new: true }
    );

    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
});

// GET "/profile/:userId/image" => Renderiza el formulario para actualizar la foto de perfil
router.get("/:userId/image",isLoggedIn, (req, res, next) => {
  User.findById(req.params.userId)
  .then((userDetails)=>{
    res.render("profile/edit-foto.hbs",{
      userDetails
    });
    
  })
  .catch((error)=>{
    next((error))
  })
});

// POST "/profile/:userId/image" => Actualiza la foto de perfil
router.post("/:userId/image",uploader.single("image"),async (req, res, next) => {
    if (req.file === undefined) {
      try {
        const userDetails = await User.findById(req.params.userId);
        res.render("profile/edit-foto.hbs", {
          errorImageMessage:
            "Para actualizar la foto debes seleccionar un archivo",
          userDetails,
        });
      } catch (error) {
        next(error);
      }
      return;
    }
    try {
      const userDetails = await User.findByIdAndUpdate(
        req.params.userId,
        {
          image: req.file.path,
        },
        { new: true }
      );

      res.redirect("/profile");
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
