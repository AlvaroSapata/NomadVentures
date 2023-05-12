const express = require("express");
const router = express.Router();

const Destino = require("../models/viaje.model.js");
const User = require("../models/user.model.js");
const uploader = require("../middlewares/uploader.js")

// GET "/destinos" => Renderizar la lista de destinos
router.get("/", (req, res, next) => {
  Destino.find()
    .populate("lider")
    .select({ image: 1, title: 1, lider: 1, date: 1 })
    .then((allDestines) => {
      console.log(allDestines);
      res.render("destinos/lista-destinos.hbs", {
        allDestines,
      });
    })
    .catch((error) => {
      next(error);
    });
});

// GET "/destinos/crear" => Renderiza el formulario de destinos
router.get("/crear",(req, res, next) => {
  console.log("ES ESTEE", req.file);
  res.render("destinos/crear-destino.hbs");
});

// POST "/destinos/crear" => Crea el formulario de destinos
router.post("/crear", uploader.single("image"), async (req, res, next) => {
  console.log(req.session.infoSesionUser);
  //todo lider vinculado al usuario logueado
  const { title, price, date, maxPeople, lider, details, image } = req.body;
    if(req.file === undefined){
       next("no hay imagen")
       return
     }
  try {
    await Destino.create({
      title,
      price,
      date,
      maxPeople,
      lider: req.session.infoSesionUser._id,
      details,
       image: req.file.path
      
    });
    
    console.log("fecha", req.body.date);
    res.redirect("/destinos");
  } catch (error) {
    next(error);
  }

  //   res.render("destinos/crear-destino.hbs");
});


router.get("/:destinoId", (req,res, next)=>{
  Destino.findById(req.params.destinoId)
  .populate("lider")
  .then((allDetails)=>{
   console.log("aquiii",allDetails.date.toLocaleDateString('Sp-SP', { weekday:"long", year:"numeric", month:"short", day:"numeric"}));
   res.render("destinos/detalles-destino.hbs",{
    allDetails
   })
     
  })
   .catch((error)=>{
    next(error)
   })
})
module.exports = router;
