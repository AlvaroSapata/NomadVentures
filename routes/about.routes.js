const express = require("express");
const router = express.Router();

const User = require("../models/user.model.js");
const uploader = require("../middlewares/uploader.js");

// GET "/about" => Renderiza la pagina de about
router.get("/", (req, res, next) => {
    res.render("about/about.hbs",{
        
    });
  });

module.exports = router;