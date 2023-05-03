const express = require("express");
const path = require("path");
const app = express();
const router = require("./router.js");
const methodOverride = require("method-override");
const session = require("express-session");
const count = require("./middlewares/locals");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));

//Define a pasta public como sendo a pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(session({ secret: "oshkosh", resave: true, saveUninitialized: true }));
app.use(count); // para contagem do produto no carrinho
app.use(function carrinhoLocal(req, res, next) {
  res.locals.carrinhoSession = req.session.carrinho;
  next();
});

// middleware adm

app.use((req, res, next) => {
  if (req.session.admLogado) {
    console.log("Administrador logado....");
  } else {
    console.log("Visita qualquer... ");
  }
  next();
});

//Usa roteador para controladores
app.use(router);

// exportando aplicação
module.exports = app;
