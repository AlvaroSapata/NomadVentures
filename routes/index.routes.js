const express = require('express');
const router = express.Router();

const {updateLocals} = require("../middlewares/auth.middleware.js")
// Quiero que en todas las rutas tenga acceso a isUserActive
router.use(updateLocals)

// GET "/" => Renderiza home
router.get("/",(req,res,next)=>{
    res.render("index.hbs")
})

// Añade el prefijo /destinos a las rutas de destinos
const viajeRouter = require("./destinos.routes")
router.use("/destinos", viajeRouter);

// Añade el prefijo /auth a las rutas de autenticacion
const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

// Añade el prefijo /about a las rutas de about
const aboutRouter = require("./about.routes")
router.use("/about", aboutRouter)

// Añade el prefijo /profile a las rutas de perfil
const profileRouter = require("./profile.routes")
router.use("/profile", profileRouter)

// Añade el prefijo /admin a las rutas de admin
const adminRouter = require("./admin.routes")
router.use("/admin", adminRouter)

module.exports = router;
