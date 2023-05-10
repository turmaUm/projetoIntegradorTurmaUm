const express = require('express')
const path = require('path')
const clientController = require('./controllers/clientController')
const loginController = require('./controllers/loginController')
const userPanelController = require('./controllers/userPanelController')
const userSession = require('./middlewares/userSession')
const admController = require('./controllers/admController')
const verificaSeLogado = require('./middlewares/verificaSeLogado')
const { Router } = require('express')
const router = express.Router()

//Rotas cliente
router.get('/checkout-endereco', userSession, clientController.showEndereco)
router.get('/checkout-pagamento', userSession, clientController.showPagamento)
router.get('/finalizacao', userSession,clientController.showFinalizacao)
router.get('/home', userSession, clientController.showHome)
router.get('/produto', userSession, clientController.showProduto)
router.get('/resultado-busca', userSession, clientController.showResultadoBusca)
router.get('/addCarrinho', userSession, clientController.addCarrinho)
router.get('/carrinho', userSession, clientController.showCarrinho)
router.get('/deleteCarrinho/:id/:tamanho/:cor', userSession, clientController.deleteCarrinho)
router.get('/finalizarCompra', userSession, clientController.finalizarCompra)
router.get('/teste', userSession, verificaSeLogado, admController.teste)
router.get('/cliente/pedidos', userSession, clientController.showPedidos)
router.get('/politica', userSession, clientController.showPolitica)

//Rotas adm
router.get('/login-adm', loginController.showLoginAdm)
router.post('/login-adm', loginController.loginAdm)

router.get('/categorias-adm',  verificaSeLogado, admController.showResultadoCategoriasAdm)
router.get('/clientes-adm', verificaSeLogado, admController.showResultadoClientesAdm)
router.get('/produtos-adm', verificaSeLogado, admController.showResultadoProdutosAdm)
router.get('/pedidos-adm', verificaSeLogado, admController.showResultadoPedidosAdm)
router.get('/admins-adm', verificaSeLogado, admController.showResultadoAdminsAdm)

router.get('/resultado-clientes-adm', verificaSeLogado, admController.showResultadoClientesAdm)
router.get('/resultado-produtos-adm', verificaSeLogado, admController.showResultadoProdutosAdm)
router.get('/resultado-pedidos-adm', verificaSeLogado, admController.showResultadoPedidosAdm)
router.get('/resultado-administradores-adm', verificaSeLogado, admController.showResultadoAdminsAdm)

//Rotas adm para cadastrar
router.get("/adm/cadastrar-produto", verificaSeLogado, admController.showCadastrarProdutosAdm)
router.get("/adm/cadastrar-categoria", verificaSeLogado, admController.showCadastrarCategoriaAdm)
router.get("/adm/cadastrar-adm", verificaSeLogado, admController.showCadastrarAdminAdm)
router.post("/salvar-produto-adm", verificaSeLogado, admController.showSalvarProdutosAdm)
router.post("/salvar-categoria-adm", verificaSeLogado, admController.showSalvarCategoriaAdm)
router.post("/salvar-admin-adm", verificaSeLogado, admController.showSalvarAdminAdm)

//Rotas adm para editar
router.get('/adm/produtos/editar/:id', admController.ShowEditProduto)
router.post('/adm/produtos/atualizar/:id', admController.atualizarProduto)

router.get('/adm/categorias/editar/:id', verificaSeLogado, admController.showEditCategoriaAdm)
router.post('/adm/categorias/atualizar/:id', verificaSeLogado, admController.atualizarCategoria)

router.get('/adm/administradores/editar/:id', verificaSeLogado, admController.showEditAdminAdm)
router.post('/adm/administradores/atualizar/:id', verificaSeLogado, admController.atualizarAdmnistradores)

router.get('/adm/clientes/editar/:id', verificaSeLogado, admController.showEditClienteAdm)
router.post('/adm/clientes/atualizar/:id', verificaSeLogado, admController.atualizarCliente)

router.get('/adm/pedidos/editar/:id', verificaSeLogado, admController.showEditPedidoAdm)
router.post('/adm/pedidos/atualizar/:id', verificaSeLogado, admController.atualizarPedido)

//Rotas adm para deletar
router.delete('/deleteproduto/:id?', verificaSeLogado, admController.deleteProduto)
router.delete('/deleteCategoria/:id?', verificaSeLogado, admController.deleteCategoria)
router.delete('/deleteAdmin/:id?', verificaSeLogado, admController.deleteAdmin)
router.delete('/deleteCliente/:id?', verificaSeLogado, admController.deleteCliente)
router.delete('/deletePedido/:id?', verificaSeLogado, admController.deletePedido)

router.get('/adm/logout', verificaSeLogado, loginController.logoutAdm)

router.get('/login', userSession, loginController.showLogin)
router.post('/cadastro', loginController.userRegister)
router.post('/login', loginController.login)
router.get('/logout', loginController.logout)

router.get('/cliente', userSession, userPanelController.showCliente)
router.get('/cliente/editar/:id', userSession, userPanelController.showEditarPerfil)
router.post('/cliente/editar/:id', userSession, userPanelController.atualizarPerfil)

module.exports = router;