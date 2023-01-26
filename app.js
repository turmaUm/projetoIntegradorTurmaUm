const express = require('express');
const path = require("path");
const app = express();

//Define a pasta public como sendo a pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Criando rota para página checkout endereço
app.get("/checkout_endereco", (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'checkout_endereco.html'))
});


//Criando rota para página checkout pagamento teste
app.get("/checkout_pagamento_test", (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'checkout_pagamento_test.html'))
});

//Criando rota para página checkout pagamento
app.get("/checkout_pagamento", (req,res)=>{
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

//Criando rota para página de login ADM
app.get("/login-adm", (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'login-adm.html'))
});

//Criando rota para página de clientes ADM
app.get("/clientes-adm", (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'clientes-adm.html'))
});

//Criando rota para página de produtos ADM
app.get("/produtos-adm", (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'produtos-adm.html'))
});

//Criando rota para página de pedidos ADM
app.get("/pedidos-adm", (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'pedidos-adm.html'))
});

//Criando rota para página de resultado de busca
app.get("/busca", (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'resultado_busca.html'))
});


//Colocar o servidor no modo "escuta"
app.listen(3000);

