let arraydb = require('../../db/produtos.json')
const { avaliandoId, addProduto, salvaJson, editProduto, delProduto } = require('../functions/functionsWrite')
const produtosCliente = require('../../db/produtosCliente.json')

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
        let {id} = req.query
        let produto = produtosCliente.find(p=>p.id==id)
        res.render('produto',{produto: produto})
    },
    showResultadoBusca: (req, res) => {
        let array = []
        for(let value in req.query){
              array.push(value) 
        }
        let prodClient = produtosCliente.filter(function analisa(produto) {
            for(let categoria of array){
                if(produto.categoria == categoria){
                    return produto
                }
            }
        })
        console.log(prodClient)
        res.render('resultado_busca', {produtos: prodClient})
    },
    showLoginAdm: (req, res) => {
        res.render('login-adm')
    },
    showClientesAdm: (req, res) => {
        res.render('clientes-adm')
    },
    showProdutosAdm: (req, res) => {
        let produtos = arraydb
        let value = req.query.value
        res.render('produtos-adm', {produtos, value})
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
        //acrescentando id ao produto (lixo: // produto.id = 1;)
        avaliandoId(arraydb, produto)
        // Adicionando o Produto        
        addProduto(arraydb, produto)
        //redirecionar pagina (lixo: // res.send(arraydb)  // Exibindo o arquivo json )
        res.redirect('/produtos-adm')  
    },
    showCarrinho: (req, res) => {
        res.render('carrinho')
    },
    editarProduto: (req, res) => {
        let {id} = req.params
        let produto = arraydb.find(p=> p.id == id)
        res.render('form-edit-produto.ejs', {prod: produto})
    },
    atualizarProduto:(req,res) => {
        // res.send('Produto atualizado')
        // let produto=arraydb.find(p=> p.id == id) // vc pega o valor do json que vc que modificar
        // produto.nome = req.body.nome;
        // produto.categoria = req.body.categoria;
        // produto.fornecedor = req.body.fornecedor;
        // produto.preco = req.body.preco;
        // salvaJson(arraydb)
        let {id} = req.params
        let reqb = req.body // requisicao que vc recebe do body
        editProduto(id, arraydb, reqb)

        // res.send(arraydb[id-1]);
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
        res.render('produtos-adm', {value, produtos})
    }
}

module.exports = paginasController