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
  showPagamento: (req, res) => {
    res.render("compra/checkout-pagamento");
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
  showProduto: (req, res) => {
    let { id } = req.query;
// ------- codigo antigo --------
    let produto = produtosCliente.find((p) => p.id == id);

    res.render("display/produto", { produto: produto });

// --------------------------------------------------------- 


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
    
    // let produtosDb2 = await Produtos.findAll({where:{preco:{[Op.between]:[precoMin, precoMax]}},
    //   include:[
    //     {model:Categorias, as:"categorias",where:{id:idCategoria}, attribute:['nome']},
    //     {model:Cores, as:"cores", through:'produto_cor', where:{id:cores}, attribute:['nome']},]})
    // let produtosDb = await Produtos.findAll({
    //   include: 'categorias',
    //   where: where
    // });, where:{preco:{[Op.between]:[precoMin, precoMax]}}

    // --------------------------------------------------------------------

    // tentativas de filtros falhas, caso queira usar de parâmetro para começar

    // if(cores != undefined) {
    //     where.
    // }

    // let produtosDb = await Produtos.findAll({
    //     include: [
    //         {model: Categorias, as: 'categorias'},
    //         {model: Cores, as: 'cores', through: 'produto_cor', attributes: {
    //             where: {
    //                 id: {[Op.or]: cores}
    //             }
    //         } }
    //     ]
    // });
    
    // console.log(arrayCategoria)
    // console.log(produtosDb)
    // console.log(cores)
    // console.log(precoMax)
    // console.log(precoMin)
    // console.log(tamanhos)
    // console.log(typeof idCategoria)
    // console.log(idCategoria)
    // console.log(produtosDb2)
    
    //console.log(req.query)

    res.render("display/resultado-busca", { produtos: produtosDb, idCategoria });

  },
  showPolitica: (req, res) => {
    res.render("cliente/politica");
  },
  showCarrinho: (req, res) => {
    res.render("compra/carrinho", { produtos: req.session.carrinho });
  },

  // ------------------------------------ POST/DELETE --------------------------------------

  addCarrinho: (req, res) => {
    let addCarrinho = produtosCliente.find((p) => p.id == req.query.id);
    addCarrinho.quantidade = req.query.quantidade;
    addCarrinho.corescolha = req.query.cor;
    addCarrinho.tamanhoescolha = req.query.tamanho;

    if (!req.session.carrinho) {
      req.session.carrinho = [];
    }

    if (
      req.session.carrinho.findIndex(
        (p) =>
          p.id == addCarrinho.id &&
          p.tamanhoescolha == addCarrinho.tamanhoescolha &&
          p.corescolha == addCarrinho.corescolha
      ) != -1
    ) {
      let obj = req.session.carrinho.find((p) => p.id == addCarrinho.id);
      let cal = Number(obj.quantidade) + Number(addCarrinho.quantidade);
      obj.quantidade = cal.toString();
      // console.log('funcionou')
    } else {
      req.session.carrinho.push(addCarrinho);
    }
    // console.log('<><><><><><><><><><><><><><><><>')
    console.log(req.session.carrinho);
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
      (p) => p.id == id && p.tamanhoescolha == tamanho && p.corescolha == cor
    );
    req.session.carrinho.splice(posicao, 1);
    res.redirect("/carrinho");
  },
  finalizarCompra: (req, res) => {
    res.send(req.query);
  },
};

module.exports = clientController;
