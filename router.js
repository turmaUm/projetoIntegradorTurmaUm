const express = require('express')
const path = require('path')
const paginasController = require('./controllers/paginasController')

const router = express.Router()

router.get('/checkout_endereco', paginasController.showEndereco)
router.get('/checkout_pagamento', paginasController.showPagamento)
router.get('/cliente', paginasController.showCliente)
router.get('/finalizacao', paginasController.showFinalizacao)
router.get('/home', paginasController.showHome)
router.get('/login', paginasController.showLogin)
router.get('/produto', paginasController.showProduto)
router.get('/resultado-busca', paginasController.showResultadoBusca)
router.get('/login-adm', paginasController.showLoginAdm)
router.get('/clientes-adm', paginasController.showClientesAdm)
router.get('/produtos-adm', paginasController.showProdutosAdm)
router.get('/pedidos-adm', paginasController.showPedidosAdm)


module.exports = router