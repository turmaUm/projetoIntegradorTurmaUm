let arraydb = require('../../db/produtos.json')
const { avaliandoId, addProduto, salvaJson, editProduto, delProduto } = require('../functions/functionsWrite')
const produtosCliente = require('../../db/produtosCliente.json')
const produtosCarrinho = require('../../db/carrinho.json')
const fs = require('fs')
const path = require('path')

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
    showClientesAdm: (req, res) => {
        res.render('adm/clientes-adm')
    },
    showProdutosAdm: (req, res) => {
        let produtos = arraydb
        let value = req.query.value
        res.render('adm/produtos-adm', {produtos, value})
    },
    showPedidosAdm: (req, res) => {
        res.render('adm/pedidos-adm')
    },
    showCadastrarProdutosAdm:(req,res) => {
        // res.send("aqui esta o formulario")
        res.render("adm/form-add-produto.ejs")
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
    editarProduto: (req, res) => {
        let {id} = req.params
        let produto = arraydb.find(p=> p.id == id)
        res.render('adm/form-edit-produto', {prod: produto})
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
        res.render('adm/produtos-adm', {value, produtos})
    },
    teste:(req,res)=>{
        res.render('display/teste.ejs')
    }
}

module.exports = paginasController