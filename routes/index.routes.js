const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


const viajeRouter = require("./destinos.routes")
router.use("/destinos", viajeRouter);

 const authRouter = require("./auth.routes")
  router.use("/auth", authRouter)







module.exports = router;
