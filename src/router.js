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
router.get('/categorias-adm', paginasController.showResultadoCategoriasAdm)
router.get('/clientes-adm', paginasController.showResultadoClientesAdm)
router.get('/produtos-adm', paginasController.showResultadoProdutosAdm)
router.get('/pedidos-adm', paginasController.showResultadoPedidosAdm)
router.get('/resultado-clientes-adm', paginasController.showResultadoClientesAdm)
router.get('/resultado-produtos-adm', paginasController.showResultadoProdutosAdm)
router.get('/resultado-pedidos-adm', paginasController.showResultadoPedidosAdm)
router.get('/resultado-administradores-adm', paginasController.showResultadoAdminsAdm)



//Rotas adm cadastrar
router.get("/adm/cadastrar-produto", paginasController.showCadastrarProdutosAdm)
router.get("/adm/cadastrar-categoria", paginasController.showCadastrarCategoriaAdm)
router.get('/adm/cadastrar-adm', paginasController.showCadastrarAdminAdm)
router.post("/salvar-produto-adm", paginasController.showSalvarProdutosAdm)

//Rotas adm para editar
router.get('/adm/produtos/editar/:id', paginasController.ShowEditProduto)
router.put('/adm/produtos/atualizar/:id', paginasController.atualizarProduto)
router.get('/adm/categorias/editar/:id', paginasController.showEditCategoriaAdm)
router.get('/adm/clientes/editar/:id', paginasController.showEditClienteAdm)
router.get('/adm/pedidos/editar/:id', paginasController.showEditPedidoAdm)
router.get('/adm/administradores/editar/:id', paginasController.showEditAdminAdm)

//Rotas adm para deletar
router.delete('/delete/:id?', paginasController.delete)


// ---------------------------------- EM PROGRESSO -------------------------------------

router.get('/login', userSession, loginController.showLogin)
router.post('/cadastro', loginController.userRegister)
router.post('/login', loginController.login)
router.get('/logout', loginController.logout)

router.get('/cliente', userSession, userPanelController.showCliente)
router.get('/cliente/editar/:id', userSession, userPanelController.showEditarPerfil)
router.post('/cliente/editar/:id', userSession, userPanelController.atualizarPerfil)

module.exports = router;