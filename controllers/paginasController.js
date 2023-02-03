const path = require('path')

const paginasController = {
    showEndereco: (req, res) => {
        return res.sendFile(path.resolve("./views/checkout_endereco.html"))
    },
    showPagamento: (req, res) => {
        return res.sendFile(path.resolve("./views/checkout_pagamento.html"))
    },
    showCliente: (req, res) => {
        return res.sendFile(path.resolve("./views/cliente.html"))
    },
    showFinalizacao: (req, res) => {
        return res.sendFile(path.resolve("./views/finalizacaoCompras.html"))
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
        return res.sendFile(path.resolve("./views/produtos-adm.html"))
    },
    showPedidosAdm: (req, res) => {
        return res.sendFile(path.resolve("./views/pedidos-adm.html"))
    },
    showBusca: (req, res) => {
        return res.sendFile(path.resolve("./views/resultado_busca.html"))
    }
}

module.exports = paginasController