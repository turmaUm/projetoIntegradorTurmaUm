let arraydb = require("../../db/produtos.json");
const {
  avaliandoId,
  addProduto,
  salvaJson,
  editProduto,
  delProduto,
} = require("../functions/functionsWrite");
const produtosCliente = require("../../db/produtosCliente.json");
const produtosCarrinho = require("../../db/carrinho.json");
const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");

const {
  Produtos,
  Categorias,
  Cores,
  Tamanhos,
  Clientes,
  Fornecedores,
  Pedidos,
  Enderecos,
  FormasDePagamento,
  ProdutosPedidos,
  Administradores,
  sequelize,
} = require("../../database/models");

const clientController = {
  // ------------------------------------ GET/SHOW --------------------------------------

  showEndereco: (req, res) => {
    res.render("compra/checkout-endereco");
  },
  showPedidos: (req, res) => {
    res.render("cliente/pedidos");
  },
  showPagamento: async (req, res) => {
    let cliente = await Clientes.findOne({
      where: {
        id: req.session.user.id
      },
      include: [
        {model: Enderecos, as: "enderecos", attribute: ['bairro', 'logradouro', 'numero']},
      ]
    })

    cliente = cliente.toJSON()

    // let formasPagamento = await FormasDePagamento.findAll()

    let formasPagamento = await FormasDePagamento.findAll();
    
    formasPagamento = formasPagamento.map(e => e.toJSON());

    res.render("compra/checkout-pagamento", { cliente, formasPagamento});
  },
  showFinalizacao: (req, res) => {
    res.render("compra/finalizacao-compra");
  },
  showHome: (req, res) => {
    res.render("display/home");
  },
  showLogin: (req, res) => {
    res.render("cliente/login");
  },
  showProduto: async (req, res) => {
    let { id } = req.query;

    let produtoDb = await Produtos.findOne({where:{id:id},
    include:[
      {model:Cores, as:"cores", through:'produto_cor', attribute:['nome']},
      {model:Tamanhos, as:"tamanhos", through:'produto_tamanho', attribute:['nome']},
      {model:Categorias, as:"categorias", attribute:['nome']}
    ]})
    
    res.render("display/produto", { produto: produtoDb.toJSON()});

  },
  showResultadoBusca: async (req, res) => {
   // puxando categoria inserida na query
    let idCategoria = req.query.categoria;
  
    if (typeof idCategoria === 'string') {  // Quando o filtro não detalha a categoria
      idCategoria = idCategoria.split(',')  //Vem um string da query, assim é necessirio transformar
                                            //em array para ser usando no where
    }

    // declarando um objeto vazio para adicionar parâmetros
    
    var precoMin = req.query['price-min-filter']
    var precoMax = req.query['price-max-filter']
    let cores = req.query['color-filter']
    let tamanhos = req.query['size-filter']


    // se existir algum valor no idCategoria, adiciona ele no where
    if(precoMin == undefined){
      precoMin = '0'
    }else if(precoMin == ''){
      precoMin = '0'
    }

    if(precoMax== undefined){
      precoMax = '10000'
    }else if(precoMax == ''){
      precoMax = '10000'
    }

    if(idCategoria == undefined){
      let arrayCategoria = []
      const allCategoria = await Categorias.findAll()
      for(let all of allCategoria){
        arrayCategoria.push(all.id.toString())
      }
      idCategoria = arrayCategoria
    }
    if(cores == undefined){
      let arrayCores =[]
      const allCores = await Cores.findAll()
      for(let all of allCores){
        arrayCores.push(all.id.toString())
      }
      cores = arrayCores
    }
    if(tamanhos == undefined) {
      let arrayTamanhos =[]
      const allTamanhos = await Tamanhos.findAll()
      for(let all of allTamanhos){
        arrayTamanhos.push(all.id.toString())
      }
      tamanhos = arrayTamanhos
    }
    
    // puxando produtos do banco de dados com filtros, usando os parametros do where adicionados previamente

    let produtosDb = await Produtos.findAll({where:{preco:{[Op.between]:[precoMin, precoMax]}},
      include:[
        {model:Categorias, as:"categorias",where:{id:idCategoria}, attribute:['nome']},
        {model:Cores, as:"cores", through:'produto_cor', where:{id:cores}, attribute:['nome']},
        {model:Tamanhos, as:"tamanhos", through:'produto_tamanho',where:{id:tamanhos}, attribute:['nome']}
      ]});

    res.render("display/resultado-busca", { produtos: produtosDb, idCategoria });

  },
  showPolitica: (req, res) => {
    res.render("cliente/politica");
  },
  showCarrinho: (req, res) => {
    res.render("compra/carrinho", { produtos: req.session.carrinho });
  },
  showBusca: async (req, res) => {
    let trecho = req.query.busca

    let produtosFiltrados = await Produtos.findAll({
      where: {
        nome: { [Op.like]: `%${trecho}%` },
      },
    })

    let idCategoria = undefined

    if(idCategoria == undefined){
      let arrayCategoria = []
      const allCategoria = await Categorias.findAll()
      for(let all of allCategoria){
        arrayCategoria.push(all.id.toString())
      }
      idCategoria = arrayCategoria
    }

    res.render('display/resultado-busca', { produtos: produtosFiltrados, idCategoria })
  },

  // ------------------------------------ POST/DELETE --------------------------------------

  addCarrinho: async (req, res) => {
  
    let addCarrinho2 = await Produtos.findOne({where:{id:req.query.id},
    include:[
      {model:Cores, as:"cores", through:'produto_cor', where:{nome:req.query.cor}, attribute:['nome']},
      {model:Tamanhos, as:"tamanhos", through:'produto_tamanho',where:{nome:req.query.tamanho}, attribute:['nome']}
    ]})
    //transformando em JSON
    let addCarrinhoJSON = addCarrinho2.toJSON()
    addCarrinhoJSON.quantidade = req.query.quantidade 
  
    if (!req.session.carrinho) {
      req.session.carrinho = [];
    }

    if (
      req.session.carrinho.findIndex(
        (p) =>
          p.id == addCarrinhoJSON.id &&
          p.tamanhos[0].nome == addCarrinhoJSON.tamanhos[0].nome &&
          p.cores[0].nome == addCarrinhoJSON.cores[0].nome
      ) != -1
    ) {
      let obj = req.session.carrinho.find((p) =>
      p.id == addCarrinhoJSON.id &&
      p.tamanhos[0].nome == addCarrinhoJSON.tamanhos[0].nome &&
      p.cores[0].nome == addCarrinhoJSON.cores[0].nome);

      let cal = Number(obj.quantidade) + Number(addCarrinhoJSON.quantidade);
      obj.quantidade = cal.toString();
      // console.log(obj)
      // console.log('funcionou')
    } else {
      req.session.carrinho.push(addCarrinhoJSON);
    }
    // console.log('<><><><><><><><><><><><><><><><>')
    // console.log(req.session.carrinho);
    res.redirect(`/produto?id=${req.query.id}`);

    // if((req.session.carrinho.findIndex(p=>p.id == addCarrinho.id ))
    // && (req.session.carrinho.findIndex(p=>p.tamanhoescolha == addCarrinho.tamanhoescolha))
    // && (req.session.carrinho.findIndex(p=>p.corescolha == addCarrinho.corescolha))){
    //     console.log('funcionou')}
    // console.log('<><><><><><><><><><><><><><><><>')// console.log(req.session.carrinho)// delete addCarrinho['descricao']// produtosCarrinho.push(addCarrinho)// fs.writeFileSync(path.join(__dirname,"../../db/carrinho.json"), JSON.stringify(produtosCarrinho,null,4))
  },
  deleteCarrinho: (req, res) => {
    let { id, tamanho, cor } = req.params;
    let posicao = req.session.carrinho.findIndex(
      (p) => p.id == id && p.tamanhos[0].nome == tamanho && p.cores[0].nome == cor
    );
    req.session.carrinho.splice(posicao, 1);
    res.redirect("/carrinho");
  },
  finalizarCompra: (req, res) => {
    res.send(req.query);
  },
  cadastraPedido: async (req, res) => {
    let enderecoId = req.body.endereco

    console.log(enderecoId)

    // await Pedidos.create({
    //   enderecos_id: ,
    //   cliente_id:,
    //   formas_de_pagamento_id
    // })
  }
};

module.exports = clientController;
