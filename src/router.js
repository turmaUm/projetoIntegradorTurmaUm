const express = require('express')
const path = require('path')
const clientController = require('./controllers/clientController')
const loginController = require('./controllers/loginController')
const userPanelController = require('./controllers/userPanelController')
const userSession = require('./middlewares/userSession')
const admController = require('./controllers/admController')

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
router.get('/teste', userSession, admController.teste)
router.get('/cliente/pedidos', userSession, clientController.showPedidos)
router.get('/politica', userSession, clientController.showPolitica)

//Rotas adm
router.get('/login-adm', loginController.showLoginAdm)
router.post('/login-adm', loginController.loginAdm)

router.get('/categorias-adm', admController.showResultadoCategoriasAdm)
router.get('/clientes-adm', admController.showResultadoClientesAdm)
router.get('/produtos-adm', admController.showResultadoProdutosAdm)
router.get('/pedidos-adm', admController.showResultadoPedidosAdm)

router.get('/resultado-clientes-adm', admController.showResultadoClientesAdm)
router.get('/resultado-produtos-adm', admController.showResultadoProdutosAdm)
router.get('/resultado-pedidos-adm', admController.showResultadoPedidosAdm)
router.get('/resultado-administradores-adm', admController.showResultadoAdminsAdm)

//Rotas adm para cadastrar
router.get("/adm/cadastrar-produto", admController.showCadastrarProdutosAdm)
router.get("/adm/cadastrar-categoria", admController.showCadastrarCategoriaAdm)
router.get('/adm/cadastrar-adm', admController.showCadastrarAdminAdm)
router.post("/salvar-produto-adm", admController.showSalvarProdutosAdm)

//Rotas adm para editar
router.get('/adm/produtos/editar/:id', admController.ShowEditProduto)
router.put('/adm/produtos/atualizar/:id', admController.atualizarProduto)
router.get('/adm/categorias/editar/:id', admController.showEditCategoriaAdm)
router.get('/adm/clientes/editar/:id', admController.showEditClienteAdm)
router.get('/adm/pedidos/editar/:id', admController.showEditPedidoAdm)
router.get('/adm/administradores/editar/:id', admController.showEditAdminAdm)

//Rotas adm para deletar
router.delete('/delete/:id?', admController.delete)


// ---------------------------------- EM PROGRESSO -------------------------------------

router.get('/login', userSession, loginController.showLogin)
router.post('/cadastro', loginController.userRegister)
router.post('/login', loginController.login)
router.get('/logout', loginController.logout)

router.get('/cliente', userSession, userPanelController.showCliente)
router.get('/cliente/editar/:id', userSession, userPanelController.showEditarPerfil)
router.post('/cliente/editar/:id', userSession, userPanelController.atualizarPerfil)

module.exports = router;