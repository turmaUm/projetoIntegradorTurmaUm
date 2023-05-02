let arraydb = require('../../db/produtos.json')
const { avaliandoId, addProduto, salvaJson, editProduto, delProduto } = require('../functions/functionsWrite')
const produtosCliente = require('../../db/produtosCliente.json')
const produtosCarrinho = require('../../db/carrinho.json')
const fs = require('fs')
const path = require('path')
const {Op} = require('sequelize')

const { Produtos, Categorias, Clientes, Fornecedores, Pedidos, Enderecos, FormasDePagamento, ProdutosPedidos, sequelize } = require('../../database/models')

const paginasController = {

    // ------------------------------------ GET/SHOW CLIENTE --------------------------------------

    showEndereco: (req, res) => {
        res.render('compra/checkout-endereco')
    },
    showPedidos: (req, res) => {
        res.render('cliente/pedidos')
    },
    showPagamento: (req, res) => {
        res.render('compra/checkout-pagamento')
    },
    showFinalizacao: (req, res) => {
        res.render('compra/finalizacao-compra')
    },
    showHome: (req, res) => {
        res.render('display/home')
    },
    showLogin: (req, res) => {
        res.render('cliente/login')
    },
    showProduto: (req, res) => {
        let {id} = req.query
        let produto = produtosCliente.find(p=>p.id==id)
        // console.log(produto)
        res.render('display/produto',{produto: produto})
 
    },
    showResultadoBusca: (req, res) => {
        let array = []
        for(let value in req.query){
              array.push(value) 
        }
        if(array.length != 0){
            let prodClient = produtosCliente.filter(function analisa(produto) {
                for(let categoria of array){
                    if(produto.categoria == categoria){
                        return produto
                    }
                }
            })
            // console.log(prodClient)
            res.render('display/resultado-busca', {produtos: prodClient})

        }else{
            res.render('display/resultado-busca', {produtos: produtosCliente})
        }
    },
    showPolitica: (req, res) => {
        res.render('cliente/politica')
    },
    showCarrinho: (req, res) => {
        
        res.render('compra/carrinho', {produtos: req.session.carrinho})
        // console.log(req.session.carrinho)
    },

    // ------------------------------------ GET/SHOW ADM --------------------------------

    showLoginAdm: (req, res) => {
        res.render('adm/login-adm')
    },
    showProdutosAdm: async (req, res) => {

        let produtos = await Produtos.findAll({
            include: [
                {model: Categorias, as: 'categorias', attributes: ['nome']},
                {model: Fornecedores, as: 'fornecedores', attributes: ['nome']}
            ]
        })

        res.render('adm/produtos-adm', {produtos})
    },
    showResultadoProdutosAdm: async (req, res) => {
        const consulta = req.query.pesquisar === undefined ? '' : req.query.pesquisar

        const resultadoPorBusca = req.query.resPorBusca === undefined ? 10 : Number(req.query.resPorBusca)

        const pagina = req.query.pagina === undefined ? 1 : Number(req.query.pagina)

        const numProdutos = await Produtos.count({
            where: {
                nome: {[Op.like]: `%${consulta}%`}
            },
            include: [
                {model: Categorias, as: 'categorias', attributes: ['nome']},
                {model: Fornecedores, as: 'fornecedores', attributes: ['nome']}
            ]
        })

        const totalDePaginas = Math.ceil(numProdutos/resultadoPorBusca)

        const nMaxPaginas = 5

        let primeiroNumero = pagina - Math.floor(nMaxPaginas / 2)

        let ultimoNumero = pagina + Math.floor(nMaxPaginas / 2)

        if (primeiroNumero < 1) {
            primeiroNumero = 1
        }

        if (ultimoNumero > totalDePaginas) {
            ultimoNumero = totalDePaginas
        }

        const produtos = await Produtos.findAll({
            where: {
                nome: {[Op.like]: `%${consulta}%`}
            },
            include: [
                {model: Categorias, as: 'categorias', attributes: ['nome']},
                {model: Fornecedores, as: 'fornecedores', attributes: ['nome']}
            ],
            limit: resultadoPorBusca,
            offset: (pagina - 1) * resultadoPorBusca
        })

        res.render('adm/produtos-adm', {produtos, consulta, pagina, resultadoPorBusca, ultimoNumero, primeiroNumero})
    },
    showPedidosAdm: async (req, res) => {

        const pedidos = await Pedidos.findAll({
            include: [
                {model: Enderecos, as: 'enderecos', attributes: ['logradouro', 'numero' ] },
                {model: Produtos, as: 'produtos', through: 'produtos_pedidos', attributes: ['id', 'nome' ] },
                {model: Clientes, as: 'clientes', attributes: ['nome' ] },
                {model: FormasDePagamento, as: 'formas_de_pagamento', attributes: ['nome' ] }
            ]
        })

        res.render('adm/pedidos-adm', {pedidos})
    },
    showResultadoPedidosAdm: async (req, res) => {
         const consulta = req.query.pesquisar === undefined ? '' : req.query.pesquisar

        const resultadoPorBusca = req.query.resPorBusca === undefined ? 10 : Number(req.query.resPorBusca)

        const pagina = req.query.pagina === undefined ? 1 : Number(req.query.pagina)

        const { count: numPedidos, rows: pedidos } = await Pedidos.findAndCountAll({
            where: {
                '$clientes.nome$': {[Op.like]: `%${consulta}%`}
            }, 
            include: [
                {model: Enderecos, as: 'enderecos', attributes: ['logradouro', 'numero' ] },
                {model: Produtos, as: 'produtos', through: 'produtos_pedidos', attributes: ['id', 'nome' ] },
                {model: Clientes, as: 'clientes', attributes: ['nome' ] },
                {model: FormasDePagamento, as: 'formas_de_pagamento', attributes: ['nome' ] }
            ]
        })

        const totalDePaginas = Math.ceil(numPedidos/resultadoPorBusca)

        const nMaxPaginas = 5

        let primeiroNumero = pagina - Math.floor(nMaxPaginas / 2)

        let ultimoNumero = pagina + Math.floor(nMaxPaginas / 2)

        if (primeiroNumero < 1) {
            primeiroNumero = 1
        }

        if (ultimoNumero > totalDePaginas) {
            ultimoNumero = totalDePaginas
        }

        res.render('adm/pedidos-adm', {consulta, pedidos, pagina, resultadoPorBusca, ultimoNumero, primeiroNumero})

    },
    showResultadoClientesAdm: async (req, res) => {
        const consulta = req.query.pesquisar === undefined ? '' : req.query.pesquisar

        const resultadoPorBusca = req.query.resPorBusca === undefined ? 10 : Number(req.query.resPorBusca)

        const pagina = req.query.pagina === undefined ? 1 : Number(req.query.pagina)

        const numClientes = await Clientes.count({
            where: {
                nome: {[Op.like]: `%${consulta}%`}
            }
        })

        const totalDePaginas = Math.ceil(numClientes/resultadoPorBusca)

        const nMaxPaginas = 5

        let primeiroNumero = pagina - Math.floor(nMaxPaginas / 2)

        let ultimoNumero = pagina + Math.floor(nMaxPaginas / 2)

        if (primeiroNumero < 1) {
            primeiroNumero = 1
        }

        if (ultimoNumero > totalDePaginas) {
            ultimoNumero = totalDePaginas
        }

        const clientes = await Clientes.findAll({
            where: {
                nome: {[Op.like]: `%${consulta}%`}
            },
            limit: resultadoPorBusca,
            offset: (pagina - 1) * resultadoPorBusca
        })

        res.render('adm/clientes-adm', {consulta, clientes, pagina, resultadoPorBusca, ultimoNumero, primeiroNumero})
    },
    showResultadoCategoriasAdm: async (req, res) => {
        const consulta = req.query.pesquisar === undefined ? '' : req.query.pesquisar

        const resultadoPorBusca = req.query.resPorBusca === undefined ? 10 : Number(req.query.resPorBusca)

        const pagina = req.query.pagina === undefined ? 1 : Number(req.query.pagina)

        const numCategorias = await Clientes.count({
            where: {
                nome: {[Op.like]: `%${consulta}%`}
            }
        })

        const totalDePaginas = Math.ceil(numCategorias/resultadoPorBusca)

        const nMaxPaginas = 5

        let primeiroNumero = pagina - Math.floor(nMaxPaginas / 2)

        let ultimoNumero = pagina + Math.floor(nMaxPaginas / 2)

        if (primeiroNumero < 1) {
            primeiroNumero = 1
        }

        if (ultimoNumero > totalDePaginas) {
            ultimoNumero = totalDePaginas
        }

        const categorias = await Categorias.findAll({
            where: {
                nome: {[Op.like]: `%${consulta}%`}
            },
            limit: resultadoPorBusca,
            offset: (pagina - 1) * resultadoPorBusca
        }) 

        res.render('adm/categorias-adm', {consulta, categorias, pagina, resultadoPorBusca, ultimoNumero, primeiroNumero})
    },
    showCadastrarProdutosAdm:(req,res) => {
        res.render("adm//forms/form-add-produto.ejs")
    },
    showCadastrarCategoriaAdm: async (req, res) => {
        res.render("adm/forms/form-add-categoria")
    },
    showEditCategoriaAdm: async (req, res) => {
        res.render("adm/forms/form-edit-categoria")
    },
    showEditClienteAdm: async (req, res) => {
        res.render("adm/forms/form-edit-cliente")
    },
    showEditPedidoAdm: async (req, res) => {
        res.render("adm/forms/form-edit-pedido")
    },
    ShowEditProduto: async (req, res) => {
        let {id} = req.params

        let produto = await Produtos.findAll({
            where: {
                id: id
            }
        })

        produto = produto[0].toJSON()

        res.render('adm/forms/form-edit-produto', {prod: produto})
    },
    showSalvarProdutosAdm: async (req,res)=>{

        let produto = await Produtos.create({
            nome: req.body.nome,
            preco: req.body.preco,
            categoriaId: req.body.categorias
        })  

        console.log(produto.toJSON())

        res.redirect('/produtos-adm')  
    },

    // ------------------------------------ POST CLIENTE --------------------------------------
    
    addCarrinho:(req,res)=>{
        
        let addCarrinho = produtosCliente.find(p=>p.id == req.query.id)
        addCarrinho.quantidade = req.query.quantidade
        addCarrinho.corescolha = req.query.cor
        addCarrinho.tamanhoescolha = req.query.tamanho
        
        if(!req.session.carrinho){
            req.session.carrinho =[]
        }

        if((req.session.carrinho.findIndex(p=>p.id == addCarrinho.id 
            && p.tamanhoescolha == addCarrinho.tamanhoescolha 
            && p.corescolha == addCarrinho.corescolha) != -1)){
                let obj = req.session.carrinho.find(p=> p.id == addCarrinho.id)
                let cal = Number(obj.quantidade) + Number(addCarrinho.quantidade)
                obj.quantidade = cal.toString();
                // console.log('funcionou')

        }else{
            req.session.carrinho.push(addCarrinho)
        }
        // console.log('<><><><><><><><><><><><><><><><>')
        console.log(req.session.carrinho)
        res.redirect(`/produto?id=${req.query.id}`)
        
        // if((req.session.carrinho.findIndex(p=>p.id == addCarrinho.id ))
        // && (req.session.carrinho.findIndex(p=>p.tamanhoescolha == addCarrinho.tamanhoescolha))
        // && (req.session.carrinho.findIndex(p=>p.corescolha == addCarrinho.corescolha))){
        //     console.log('funcionou')}
        // console.log('<><><><><><><><><><><><><><><><>')// console.log(req.session.carrinho)// delete addCarrinho['descricao']// produtosCarrinho.push(addCarrinho)// fs.writeFileSync(path.join(__dirname,"../../db/carrinho.json"), JSON.stringify(produtosCarrinho,null,4))
    },
    deleteCarrinho: (req,res)=>{
        let{id, tamanho, cor} = req.params
        let posicao = req.session.carrinho.findIndex(p => p.id == id && p.tamanhoescolha == tamanho && p.corescolha == cor);
        req.session.carrinho.splice(posicao, 1)
        res.redirect('/carrinho')
    
    },
    finalizarCompra: (req,res)=>{
        res.send(req.query)
    },


    // ------------------------------------ POST ADM ------------------------------------------

    atualizarProduto: async (req,res) => {

        let id = req.params.id

        await Produtos.update({
            nome: req.body.nome,
            preco: req.body.preco,
            categoriaId: req.body.categorias
        },
            { where: { id: id } });

        res.redirect('/produtos-adm')
    },
    delete:(req,res) =>{
        
        // let posicao = arraydb.findIndex(p => p.id == id);
        // // console.log(posicao)
        // arraydb.splice(posicao, 1)
        // salvaJson(arraydb)
        let {id} = req.params
        delProduto(id,arraydb)
        res.redirect('/produtos-adm')
    },
    select: (req,res) => {
        
        let value = req.query.select || 10
        let produtos = arraydb
        res.render('adm/produtos-adm', {value, produtos})
    },
    teste:(req,res)=>{
        res.render('display/teste.ejs')
    }
}

module.exports = paginasController