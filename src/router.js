const express = require('express')
const path = require('path')
const paginasController = require('./controllers/paginasController')
const loginController = require('./controllers/loginController')
const userPanelController = require('./controllers/userPanelController')

const router = express.Router()

//Rotas cliente
router.get('/checkout-endereco', paginasController.showEndereco)
router.get('/checkout-pagamento', paginasController.showPagamento)
router.get('/cliente/editar', paginasController.showEditarPerfil)
router.get('/finalizacao', paginasController.showFinalizacao)
router.get('/home', paginasController.showHome)
router.get('/produto', paginasController.showProduto)
router.get('/resultado-busca', paginasController.showResultadoBusca)
router.get('/addCarrinho', paginasController.addCarrinho )
router.get('/carrinho', paginasController.showCarrinho)
router.get('/deleteCarrinho/:id/:tamanho/:cor', paginasController.deleteCarrinho)
router.get('/finalizarCompra', paginasController.finalizarCompra)


router.get('/teste', paginasController.teste)
//Rotas adm
router.get('/login-adm', paginasController.showLoginAdm)
router.get('/clientes-adm', paginasController.showClientesAdm)
router.get('/produtos-adm', paginasController.showProdutosAdm)
router.get('/pedidos-adm', paginasController.showPedidosAdm)

//Rotas adm cadastrar produto
router.get("/cadastrar-produto-adm", paginasController.showCadastrarProdutosAdm)
router.post("/salvar-produto-adm", paginasController.showSalvarProdutosAdm)

//Rotas adm para editar produto 
router.get('/editar/:id?', paginasController.editarProduto)
router.put('/atualizar/:id?', paginasController.atualizarProduto)

//Rotas adn para deletar um produto
router.delete('/delete/:id?', paginasController.delete)

// router.get('/select-value', paginasController.select)
router.get('/login', loginController.showLogin)
router.post('/cadastro', loginController.userRegister)

router.get('/cliente', userPanelController.showCliente)


module.exports = router