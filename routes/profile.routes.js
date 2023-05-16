const express = require("express");
const router = express.Router();

const Destino = require("../models/viaje.model.js");
const User = require("../models/user.model.js");
const uploader = require("../middlewares/uploader.js");

// GET "/profile" => Renderiza la vista del perfil
router.get("/", async (req, res, next) => {
  try {
    // Buscar todos los destinos del usuario logueado
    const allDestines = await Destino.find({
      lider: req.session.loggedUser._id,
    }).populate("lider");
    // Buscar la info del usuario
    const userDetails = await User.findById(req.session.loggedUser._id);
    // console.log("req.session.loggedUser",req.session.loggedUser);
    // console.log("allDestines",allDestines);
    console.log("userDetails",userDetails);
    res.render("profile/profile.hbs", {
      allDestines,
      userDetails,
    });
  } catch (error) {
    next(error);
  }
});

// GET "/profile/:userId/edit" => crea el formulario para editar detalles del usuario
router.get("/:userId/edit", (req, res, next) => {
  User.findById(req.params.userId)
    .then((userDetails) => {
      // console.log("userDetails",userDetails);
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
    //  console.log(req.body);
    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
});

// // POST "/destinos/:destinoId/edit/image" => Envia el formulario para editar detalles del destino
// router.post(
//   "/:destinoId/edit/image",
//   uploader.single("image"),
//   async (req, res, next) => {
//     if (req.file === undefined) {
//       try{
//         const destinoDetails = await Destino.findById(req.params.destinoId)

//         res.render("destinos/editar-destino.hbs", {
//           errorImageMessage: "Para actualizar la foto debes seleccionar un archivo",
//           destinoDetails
//         });

//       } catch(error){
//         next(error)
//       }

//       return;
//     }
//     try {
//       const response = await Destino.findByIdAndUpdate(
//         req.params.destinoId,
//         {
//           image: req.file.path,
//         },
//         { new: true }
//       );
//       res.redirect(`/destinos/${req.params.destinoId}/edit`);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

module.exports = router;
