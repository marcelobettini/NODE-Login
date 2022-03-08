const express = require("express");
const path = require("path");
const hbs = require("hbs");
const session = require("express-session");
const PORT = 3000;
//importamos dotenv para usar vars de entorno y no exponer datos sensibles
require("dotenv").config();
const routeLogin = require("./routes/login");
const routeIndex = require("./routes/index");
const routeSecret = require("./routes/secret");

const app = express();
app.use(express.static(path.join(__dirname, "public"))); //carpeta public
// app.use(express.json()); //permite leer datos en formato JSON
app.use(express.urlencoded({ extended: false })); //permite enviar datos de form

app.set("view engine", "hbs");
// __dirname is an environment variable that tells you the absolute path of the directory containing the currently executing file.
//la línea de abajo es igual a ...(__dirname + "/views/partials");
hbs.registerPartials(path.join(__dirname, "./views/partials"));

//// configuramos express-session copiando la sintaxis de la documentación
app.use(
  session({
    secret: "#0p3n_s3s4m3@1234567890",
    resave: false,
    saveUninitialized: true,
  })
);
//creamos el middleware para verificar los intentos de igreso a la ruta "secret",
//Aunque tratemos de entrar directamente, siempre se correrá antes el middleware
//y solo podremos acceder si req.session.user (que se setea con un valor en caso de login positivo)
//luego, si salimos de "secret", podremos volver si escribimos la ruta, siempre que la sesión
//continúe activa
const secured = async (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.render("noAuth");
  }
};
//copiamos user de req.session a var local, para poder renderizar
//conidicionalmente el navbar
const isAuth = (req, res, next) => {
  app.locals.user = req.session.user;
  next();
};

app.use("/", isAuth, routeIndex);
app.use("/login", routeLogin);
app.use("/secret", secured, routeSecret);

app.listen(PORT, (err) => {
  err
    ? console.log("Ocurrió un error al montar el servidor")
    : console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});
