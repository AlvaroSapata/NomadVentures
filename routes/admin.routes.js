const express = require("express");
const router = express.Router();

const Destino = require("../models/viaje.model.js");
const User = require("../models/user.model.js");
const uploader = require("../middlewares/uploader.js");

//Requerir los middlewares
const {isLoggedIn, isAdmin, isGuia, isUsuario} = require("../middlewares/auth.middleware.js");

// GET "/admin/validate" => Renderizar la lista de destinos por validar
router.get("/validate",isLoggedIn, isAdmin,(req, res, next) => {
    Destino.find({ isValidated: "pendiente" })
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
router.get("/:destinoId/validate",isLoggedIn, isAdmin, (req, res, next) => {
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

// POST "/admin/:destinoId/validate/aceptar" => Acepta el destino
router.post("/:destinoId/validate/aceptar", (req, res, next) => {
  Destino.findByIdAndUpdate(req.params.destinoId, { isValidated: "aceptado"},{new:true})
  .then((allDetails)=>{
    console.log("esteeee",allDetails)
   
    res.redirect("/admin/validate")
    })
    .catch((error)=>{
     next((error))
    })
})

// POST "/admin/:destinoId/validate/denegar" => Deniega el destino
router.post("/:destinoId/validate/denegar", (req, res, next) => {
  Destino.findByIdAndUpdate(req.params.destinoId, { isValidated: "rechazado"},{new:true})
  .then((allDetails)=>{
    
   
    res.redirect("/admin/validate")
    })
    .catch((error)=>{
     next((error))
    })
})

// GET "/admin/userlist" => Renderiza la lista de usuarios
router.get("/userlist",isLoggedIn, isAdmin,(req,res,next)=>{
  User.find()
  .select({firstName:1,lastName:1,email:1,phone:1,rol:1,image:1})
  .then((allUsers)=>{
    res.render("admin/lista-usuarios.hbs",{
      allUsers
    })
    
  })
  .catch((error)=>{
    next(error)
  })
})

// POST "/admin/userlist/:userId/delete" => Elimina un usuario de la base de datos
router.post("/userlist/:userId/delete", (req, res, next) => {
  User.findByIdAndDelete(req.params.userId)
    .then(() => {
      res.redirect("/admin/userlist");
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;