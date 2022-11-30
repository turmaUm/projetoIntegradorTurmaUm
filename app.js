const express = require('express');
const path = require("path");
const app = express();

//Define a pasta public como sendo a pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Criando rota para página checkout endereço
app.get("/checkout-endereco", (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'checkout_endereco.html'))
});

//Criando rota para página checkout pagamento
app.get("/checkout-pagamento", (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'checkout_pagamento.html'))
});

//Criando rota para página cliente
app.get("/cliente", (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'cliente.html'))
});

//Criando rota para pagina finalização de compra
app.get("/finalizacao", (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'finalizacaoCompras.html'))
});

//Criando rota para página de home
app.get("/home", (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'home.html'))
});

//Criando rota para página de login
app.get("/login", (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'login.html'))
});

//Criando rota para página de produto
app.get("/produto", (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'produto.html'))
});

//Criando rota para página de resultado de busca
app.get("/busca", (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'resultado_busca.html'))
});

//Colocar o servidor no modo "escuta"
app.listen(3000);

