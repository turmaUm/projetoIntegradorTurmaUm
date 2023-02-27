const express = require('express');
const path = require("path");
const app = express();
const router =  require('./router.js')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));


//Define a pasta public como sendo a pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//Usa roteador para controladores
app.use(router);

// exportando aplicação
module.exports = app;


