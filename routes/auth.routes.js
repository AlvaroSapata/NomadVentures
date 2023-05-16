const express = require("express");
const router = express.Router();

const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");

// GET "/auth/signup" => Renderizar un formulario de registro
router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

// POST "/auth/signup" => Envia el formulario de registro
router.post("/signup", async (req, res, next) => {
  /* console.log(req.body); */
  const { firstName, lastName, email, password, phone, rol, image } = req.body;
  const regexPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  //! añadir imagen

  // Campos vacios
  if (
    firstName === "" ||
    lastName === "" ||
    email === "" ||
    password === "" ||
    phone === ""
  ) {
    res.render("auth/signup.hbs", {
      errorMessage: "Todos los campos son obligatorios",
    });
  }
  // Contraseña
  if (regexPattern.test(password) === false) {
    res.render("auth/signup.hbs", {
      errorMessage:
        "La contraseña no es suficientemente fuerte. necesitas mayus,minus,caracter especial",
    });
    return;
  }
  try {
    const foundUser = await User.findOne({ email });
    const foundUser2 = await User.findOne({ phone });
    if (foundUser !== null || foundUser2 !== null) {
      res.render("auth/signup.hbs", {
        errorMessage: "email / phone duplicado",
      });
      return;
    }

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      phone,
      rol,
      // image: "https://res.cloudinary.com/dc7zm1bwc/image/upload/v1684255849/logo-removebg-preview_uiexcg.png"
      image: "https://res.cloudinary.com/dc7zm1bwc/image/upload/v1684256331/image_ezsymg.png"
    });

    res.redirect("/auth/login");
  } catch (error) {
    next(error);
  }
});

// GET "/auth/login" => Renderizar un formulario de acceso
router.get("/login", (req, res, next) => {
  res.render("auth/login.hbs");
});

// POST "/auth/login" => Envia un formulario de acceso
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    res.render("auth/login.hbs", {
      errorMessage: "Los campos son obligatorios",
    });
    return;
  }
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser === null) {
      res.render("auth/login.hbs", {
        errorMessage: "Usuario no esta registrado con ese correo",
      });
      return;
    }
    console.log("La info del usuario",foundUser);
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );

    if (isPasswordCorrect === false) {
      res.render("auth/login.hbs", {
        errorMessage: "La contraseña no es correcta",
      });
      return;
    }

    req.session.loggedUser = foundUser;

    req.session.save(() => {
      res.redirect("/");
    });
  
  } catch (error) {
    next(error);
  }
});

// GET "/auth/logout" => Destruye la sesion activa
router.get("/logout",(req,res,next)=>{
  req.session.destroy(()=>{
    res.redirect("/")
  })
})

module.exports = router;
