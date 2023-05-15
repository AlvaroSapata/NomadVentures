const express = require('express');
const router = express.Router();
const handlebars = require("handlebars")

function isEqual(value1, value2, options) {
  if (value1 === value2) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
}

handlebars.registerHelper('isEqual', isEqual);
/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


const viajeRouter = require("./destinos.routes")
router.use("/destinos", viajeRouter);

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

const aboutRouter = require("./about.routes")
router.use("/about", aboutRouter)

const profileRouter = require("./profile.routes")
router.use("/profile", profileRouter)

const adminRouter = require("./admin.routes")
router.use("/admin", adminRouter)

module.exports = router;
