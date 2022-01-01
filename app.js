const express = require("express");
const path = require("path");
const hbs = require("hbs");
const PORT = 3000;
//importamos dotenv para usar vars de entorno y no exponer datos sensibles
require("dotenv").config();
const routeLogin = require("./routes/login");
const routeIndex = require("./routes/index");

const app = express();
app.use(express.static(path.join(__dirname, "public"))); //carpeta public
// app.use(express.json()); //permite leer datos en formato JSON
app.use(express.urlencoded({ extended: false })); //permite enviar datos de form
app.set("view engine", "hbs");
// __dirname is an environment variable that tells you the absolute path of the directory containing the currently executing file.
//la línea de abajo es igual a ...(__dirname + "/views/partials");
hbs.registerPartials(path.join(__dirname, "./views/partials"));

// app.get("/", (req, res) => res.render("index"));
app.use("/", routeIndex);
app.use("/login", routeLogin);

app.listen(PORT, (err) => {
  err
    ? console.log("Ocurrió un error al montar el servidor")
    : console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});
