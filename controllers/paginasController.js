const path = require('path')

const paginasController = {
    showEndereco: (req, res) => {
        res.render('checkout_endereco')
    },
    showPagamento: (req, res) => {
        res.render('checkout_pagamento')
    },
    showCliente: (req, res) => {
        res.render('cliente')
    },
    showFinalizacao: (req, res) => {
        res.render('finalizacaoCompras')
    },
    showHome: (req, res) => {
        res.render('home')
    },
    showLogin: (req, res) => {
        res.render('login')
    },
    showProduto: (req, res) => {
        res.render('produto')
    },
    showResultado: (req, res) => {
        return res.sendFile(path.resolve("./views/resultado_busca.html"))
    },
    showLoginAdm: (req, res) => {
        return res.sendFile(path.resolve("./views/login-adm.html"))
    },
    showClientesAdm: (req, res) => {
        return res.sendFile(path.resolve("./views/clientes-adm.html"))
    },
    showProdutosAdm: (req, res) => {
        res.render('produtos-adm')
    },
    showPedidosAdm: (req, res) => {
        return res.sendFile(path.resolve("./views/pedidos-adm.html"))
    },
    showBusca: (req, res) => {
        return res.sendFile(path.resolve("./views/resultado_busca.html"))
    }
}

module.exports = paginasController