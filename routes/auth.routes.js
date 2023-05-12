const express = require('express');
const router = express.Router();

 const User = require("../models/user.model.js")
 const bcrypt = require('bcryptjs')


// GET "/auth/signup" => Renderizar un formulario de registro
router.get("/signup", (req, res, next) => {
    res.render("auth/signup.hbs");
  });

  //! HACER LAS VALIDACIONES
  
  router.post("/signup", async (req,res, next)=>{
    const {firstName, lastName, email, password, phone, rol, image}= req.body;
    const regexPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    if(regexPattern.test(password) === false){
        res.render("auth/signup.hbs", {
            errorMessage: "La contraseña no es suficientemente fuerte. necesitas mayus,minus,caracter especial"
           }) 
           return
           
    }
    try {
        const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log("LA CONTRASEÑA ENCRITADA ES" , hashPassword);

      await User.create({
        firstName,
         lastName,
          email,
           password : hashPassword,
            phone,
             rol,
              image
  
      })

      res.redirect("/")
    } catch(error){
      next(error)
    }
  })


  router.get("/login", (req, res, next) => {
    res.render("auth/login.hbs");
  });


  router.post("/login", async (req,res, next)=>{
    const { email, password} = req.body
    try{
     const foundUser = await User.findOne({email})
     if(foundUser === null){
        res.render("auth/login.hbs",{
            errorMessage: "Usuario no esta registrado con ese correo"
        })
        return
     } console.log(foundUser);
    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
    
     if(isPasswordCorrect === false){
        res.render("auth/login.hbs",{
            errorMessage: "La contraseña no es correcta"
        })
        return
     }

      req.session.infoSesionUser = foundUser

     req.session.save(()=>{
        
        res.redirect("/")
    })
    }catch(error){
     next(error)
    }
  })
  

  

module.exports = router;