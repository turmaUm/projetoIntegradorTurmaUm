const express = require('express');
const path = require("path");
const app = express();

//Define a pasta public como sendo a pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Criando rota para página de login
app.get("/login", (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'login.html'))
});

//Criando rota para página de carrinho
app.get("/carrinho", (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'carrinho.html'))
});

//Colocar o servidor no modo "escuta"
app.listen(3000);

