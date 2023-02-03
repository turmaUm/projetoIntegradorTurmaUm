const express = require('express');
const path = require("path");
const app = express();
const router =  require('./router.js')

app.set('view engine', 'ejs');

//Define a pasta public como sendo a pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Usa roteador para controladores
app.use(router);

//Colocar o servidor no modo "escuta"
app.listen(3000);

