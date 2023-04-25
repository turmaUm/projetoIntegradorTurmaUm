let arraydb = require('../../db/produtos.json')
const { avaliandoId, addProduto, salvaJson, editProduto, delProduto } = require('../functions/functionsWrite')
const produtosCliente = require('../../db/produtosCliente.json')
const produtosCarrinho = require('../../db/carrinho.json')
const fs = require('fs')
const path = require('path')

const { Produtos, Categorias, Clientes, Fornecedores, Pedidos, Enderecos, FormasDePagamento, ProdutosPedidos, sequelize } = require('../../database/models')

const paginasController = {

    // ------------------------------------GET--------------------------------------
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
    showLoginAdm: (req, res) => {
        res.render('adm/login-adm')
    },
    showClientesAdm: async (req, res) => {

        let clientes = await Clientes.findAll()

        res.render('adm/clientes-adm', {clientes})
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
    showCadastrarProdutosAdm:(req,res) => {
        // res.send("aqui esta o formulario")
        res.render("adm/form-add-produto.ejs")
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
    showCarrinho: (req, res) => {
        
        res.render('compra/carrinho', {produtos: req.session.carrinho})
        // console.log(req.session.carrinho)
    },

    
    // ------------------------------------POST--------------------------------------
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
    editarProduto: async (req, res) => {
        let {id} = req.params

        let produto = await Produtos.findAll({
            where: {
                id: id
            }
        })

        produto = produto[0].toJSON()

        res.render('adm/form-edit-produto', {prod: produto})
    },
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