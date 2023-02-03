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
        return res.sendFile(path.resolve("./views/home.html"))
    },
    showLogin: (req, res) => {
        return res.sendFile(path.resolve("./views/login.html"))
    },
    showProduto: (req, res) => {
        return res.sendFile(path.resolve("./views/produto.html"))
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