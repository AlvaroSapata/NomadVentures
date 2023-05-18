// BLOQUEAR rutas - solo se usan en las ruta especifica

function isLoggedIn(req, res, next) {
  if (req.session.loggedUser === undefined) {
    // El usuario no tiene sesion activa
    res.redirect("/");
  } else {
    next();
  }
}
// El usuario es admin
function isAdmin(req, res, next) {
  if (req.session.loggedUser.rol === "admin") {
    next();
  } else {
    res.redirect("/");
  }
}
// El usuario es guia
function isGuia(req, res, next) {
  if (req.session.loggedUser.rol === "guia") {
    next();
  } else {
    res.redirect("/");
  }
}
// El usuario es usuario
function isUsuario(req, res, next) {
  if (req.session.loggedUser.rol === "usuario") {
    next();
  } else {
    res.redirect("/");
  }
}

function isGuiaOrAdmin(req, res, next) {
  if (req.session.loggedUser.rol === "guia" || req.session.loggedUser.rol === "admin") {
    next();
  } else {
    res.redirect("/");
  }
}

// Se usa en todo el documento para visualizaciones
function updateLocals(req, res, next) {
  // Usuario logueado => isUserLogged
  // Usuario user => isUserLoggedAsUsuario
  // Usuario guia => isUserLoggedAsGuia
  // Usuario admin => isUserLoggedAsAdmin

  if (req.session.loggedUser === undefined) {
    res.locals.isUserLogged = false;
    res.locals.isUserLoggedAsUsuario = false;
    res.locals.isUserLoggedAsGuia = false;
    res.locals.isUserLoggedAsAdmin = false;
  } else if (req.session.loggedUser.rol === "admin") {
    res.locals.isUserLogged = true;
    res.locals.isUserLoggedAsUsuario = false;
    res.locals.isUserLoggedAsGuia = false;
    res.locals.isUserLoggedAsAdmin = true;
  } else if (req.session.loggedUser.rol === "guia") {
    res.locals.isUserLogged = true;
    res.locals.isUserLoggedAsUsuario = false;
    res.locals.isUserLoggedAsGuia = true;
    res.locals.isUserLoggedAsAdmin = false;
  } else if (req.session.loggedUser.rol === "usuario") {
    res.locals.isUserLogged = true;
    res.locals.isUserLoggedAsUsuario = true;
    res.locals.isUserLoggedAsGuia = false;
    res.locals.isUserLoggedAsAdmin = false;
  }

  next();
}

//* SOLO PODEMOS EXPORTAR UN ELEMENTO

module.exports = {
  isLoggedIn: isLoggedIn,
  updateLocals: updateLocals,
  isAdmin: isAdmin,
  isGuia: isGuia,
  isUsuario: isUsuario,
  isGuiaOrAdmin: isGuiaOrAdmin
};
