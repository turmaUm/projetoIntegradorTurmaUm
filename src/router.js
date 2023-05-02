const express = require('express')
const path = require('path')
const paginasController = require('./controllers/paginasController')
const loginController = require('./controllers/loginController')
const userPanelController = require('./controllers/userPanelController')
const userSession = require('./middlewares/userSession')

const router = express.Router()

//Rotas cliente
router.get('/checkout-endereco', userSession, paginasController.showEndereco)
router.get('/checkout-pagamento', userSession, paginasController.showPagamento)
router.get('/finalizacao', userSession,paginasController.showFinalizacao)
router.get('/home', userSession, paginasController.showHome)
router.get('/produto', userSession, paginasController.showProduto)
router.get('/resultado-busca', userSession, paginasController.showResultadoBusca)
router.get('/addCarrinho', userSession, paginasController.addCarrinho)
router.get('/carrinho', userSession, paginasController.showCarrinho)
router.get('/deleteCarrinho/:id/:tamanho/:cor', userSession, paginasController.deleteCarrinho)
router.get('/finalizarCompra', userSession, paginasController.finalizarCompra)
router.get('/teste', userSession, paginasController.teste)
router.get('/cliente/pedidos', userSession, paginasController.showPedidos)
router.get('/politica', userSession, paginasController.showPolitica)

//Rotas adm
router.get('/login-adm', paginasController.showLoginAdm)
router.get('/clientes-adm', paginasController.showClientesAdm)
router.get('/produtos-adm', paginasController.showProdutosAdm)
router.get('/pedidos-adm', paginasController.showPedidosAdm)

//Rotas adm cadastrar produto
router.get("/cadastrar-produto-adm", paginasController.showCadastrarProdutosAdm)
router.post("/salvar-produto-adm", paginasController.showSalvarProdutosAdm)

//Rotas adm para editar produto 
router.get('/editar/:id', paginasController.editarProduto)
router.put('/atualizar/:id', paginasController.atualizarProduto)

//Rotas adm para deletar um produto
router.delete('/delete/:id?', paginasController.delete)

router.get('/login', userSession, loginController.showLogin)
router.post('/cadastro', loginController.userRegister)
router.post('/login', loginController.login)
router.get('/logout', loginController.logout)

router.get('/cliente', userSession, userPanelController.showCliente)
router.get('/cliente/editar/:id', userSession, userPanelController.showEditarPerfil)
router.post('/cliente/editar/:id', userSession, userPanelController.atualizarPerfil)

module.exports = router;