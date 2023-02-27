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
    showResultadoBusca: (req, res) => {
        res.render('resultado_busca')
    },
    showLoginAdm: (req, res) => {
        res.render('login-adm')
    },
    showClientesAdm: (req, res) => {
        res.render('clientes-adm')
    },
    showProdutosAdm: (req, res) => {
        res.render('produtos-adm')
    },
    showPedidosAdm: (req, res) => {
        res.render('pedidos-adm')
    },
    showCadastrarProdutosAdm:(req,res) => {
        // res.send("aqui esta o formulario")
        res.render("form-add-produto.ejs")
    },
    showSalvarProdutosAdm:(req,res)=>{
        let produto = {
            nome: req.body.nome,
            categoria: req.body.categoria,
            fornecedor: req.body.fornecedor,
            preco: req.body.preco
        }

        res.send(produto)
        
    },
    showCarrinho: (req, res) => {
        res.render('carrinho')
    }
}

module.exports = paginasController