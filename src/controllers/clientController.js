let arraydb = require('../../db/produtos.json')
const { avaliandoId, addProduto, salvaJson, editProduto, delProduto } = require('../functions/functionsWrite')
const produtosCliente = require('../../db/produtosCliente.json')
const produtosCarrinho = require('../../db/carrinho.json')
const fs = require('fs')
const path = require('path')
const {Op} = require('sequelize')

const { Produtos, Categorias, Clientes, Fornecedores, Pedidos, Enderecos, FormasDePagamento, ProdutosPedidos, Administradores, sequelize } = require('../../database/models')

const clientController = {

    // ------------------------------------ GET/SHOW --------------------------------------

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
        res.render('display/produto',{produto: produto})
 
    },
    showResultadoBusca: async (req, res) => {
        let array = []

        for(let value in req.query){
              array.push(value) 
        }

        let produtosDb = await Produtos.findAll({
            include: "categorias"
        })

        let arrayDb = []

        for(let i in produtosDb) {
            arrayDb.push(produtosDb[i].toJSON());
        }

        if(array.length != 0){
            let prodClient = arrayDb.filter(function analisa(produto) {
                for(let categoria of array){
                    if(produto.categorias.nome == categoria){
                        return produto
                    }
                }
            })

        // if(array.length != 0){
        //     let prodClient = produtosCliente.filter(function analisa(produto) {
        //         for(let categoria of array){
        //             if(produto.categoria == categoria){
        //                 return produto
        //             }
        //         }
        //     })

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
    },

    // ------------------------------------ POST/DELETE --------------------------------------
    
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
    }
}

module.exports = clientController