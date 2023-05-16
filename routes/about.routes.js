const express = require("express");
const router = express.Router();

const User = require("../models/user.model.js");
const uploader = require("../middlewares/uploader.js");

// GET "/about" => Renderiza la pagina de about
router.get("/", (req, res, next) => {
  User.find({rol: "guia"})
  .select({firstName: 1, lastName: 1, image:1})
  .then((allUsers)=>{
    res.render("about/about.hbs",{
     allUsers
    })
     
    })
    .catch((error)=>{
      next((error))
    })
  })
module.exports = router;