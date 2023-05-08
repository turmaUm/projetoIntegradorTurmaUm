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
  Clientes,
  Fornecedores,
  Pedidos,
  Enderecos,
  FormasDePagamento,
  ProdutosPedidos,
  Administradores,
  sequelize,
} = require("../../database/models");

const admController = {
  // ------------------------------------ GET/SHOW --------------------------------

  showProdutosAdm: async (req, res) => {
    let produtos = await Produtos.findAll({
      include: [
        { model: Categorias, as: "categorias", attributes: ["nome"] },
        { model: Fornecedores, as: "fornecedores", attributes: ["nome"] },
      ],
    });

    res.render("adm/produtos-adm", { produtos });
  },
  showResultadoProdutosAdm: async (req, res) => {
    const consulta =
      req.query.pesquisar === undefined ? "" : req.query.pesquisar;

    const resultadoPorBusca =
      req.query.resPorBusca === undefined ? 10 : Number(req.query.resPorBusca);

    const pagina =
      req.query.pagina === undefined ? 1 : Number(req.query.pagina);

    const numProdutos = await Produtos.count({
      where: {
        nome: { [Op.like]: `%${consulta}%` },
      },
      include: [
        { model: Categorias, as: "categorias", attributes: ["nome"] },
        { model: Fornecedores, as: "fornecedores", attributes: ["nome"] },
      ],
    });

    const totalDePaginas = Math.ceil(numProdutos / resultadoPorBusca);

    const nMaxPaginas = 5;

    let primeiroNumero = pagina - Math.floor(nMaxPaginas / 2);

    let ultimoNumero = pagina + Math.floor(nMaxPaginas / 2);

    if (primeiroNumero < 1) {
      primeiroNumero = 1;
    }

    if (ultimoNumero > totalDePaginas) {
      ultimoNumero = totalDePaginas;
    }

    const produtos = await Produtos.findAll({
      where: {
        nome: { [Op.like]: `%${consulta}%` },
      },
      include: [
        { model: Categorias, as: "categorias", attributes: ["nome"] },
        { model: Fornecedores, as: "fornecedores", attributes: ["nome"] },
      ],
      limit: resultadoPorBusca,
      offset: (pagina - 1) * resultadoPorBusca,
    });

    res.render("adm/produtos-adm", {
      produtos,
      consulta,
      pagina,
      resultadoPorBusca,
      ultimoNumero,
      primeiroNumero,
      totalDePaginas,
    });
  },
  showPedidosAdm: async (req, res) => {
    const pedidos = await Pedidos.findAll({
      include: [
        {
          model: Enderecos,
          as: "enderecos",
          attributes: ["logradouro", "numero"],
        },
        {
          model: Produtos,
          as: "produtos",
          through: "produtos_pedidos",
          attributes: ["id", "nome"],
        },
        { model: Clientes, as: "clientes", attributes: ["nome"] },
        {
          model: FormasDePagamento,
          as: "formas_de_pagamento",
          attributes: ["nome"],
        },
      ],
    });

    res.render("adm/pedidos-adm", { pedidos });
  },
  showResultadoPedidosAdm: async (req, res) => {
    const consulta =
      req.query.pesquisar === undefined ? "" : req.query.pesquisar;

    const resultadoPorBusca =
      req.query.resPorBusca === undefined ? 10 : Number(req.query.resPorBusca);

    const pagina =
      req.query.pagina === undefined ? 1 : Number(req.query.pagina);

    const { count: numPedidos, rows: pedidos } = await Pedidos.findAndCountAll({
      where: {
        "$clientes.nome$": { [Op.like]: `%${consulta}%` },
      },
      include: [
        {
          model: Enderecos,
          as: "enderecos",
          attributes: ["logradouro", "numero"],
        },
        {
          model: Produtos,
          as: "produtos",
          through: "produtos_pedidos",
          attributes: ["id", "nome"],
        },
        { model: Clientes, as: "clientes", attributes: ["nome"] },
        {
          model: FormasDePagamento,
          as: "formas_de_pagamento",
          attributes: ["nome"],
        },
      ],
    });

    const totalDePaginas = Math.ceil(numPedidos / resultadoPorBusca);

    const nMaxPaginas = 5;

    let primeiroNumero = pagina - Math.floor(nMaxPaginas / 2);

    let ultimoNumero = pagina + Math.floor(nMaxPaginas / 2);

    if (primeiroNumero < 1) {
      primeiroNumero = 1;
    }

    if (ultimoNumero > totalDePaginas) {
      ultimoNumero = totalDePaginas;
    }

    res.render("adm/pedidos-adm", {
      consulta,
      pedidos,
      pagina,
      resultadoPorBusca,
      ultimoNumero,
      primeiroNumero,
    });
  },
  showResultadoClientesAdm: async (req, res) => {
    const consulta =
      req.query.pesquisar === undefined ? "" : req.query.pesquisar;

    const resultadoPorBusca =
      req.query.resPorBusca === undefined ? 10 : Number(req.query.resPorBusca);

    const pagina =
      req.query.pagina === undefined ? 1 : Number(req.query.pagina);

    const numClientes = await Clientes.count({
      where: {
        nome: { [Op.like]: `%${consulta}%` },
      },
    });

    const totalDePaginas = Math.ceil(numClientes / resultadoPorBusca);

    const nMaxPaginas = 5;

    let primeiroNumero = pagina - Math.floor(nMaxPaginas / 2);

    let ultimoNumero = pagina + Math.floor(nMaxPaginas / 2);

    if (primeiroNumero < 1) {
      primeiroNumero = 1;
    }

    if (ultimoNumero > totalDePaginas) {
      ultimoNumero = totalDePaginas;
    }

    const clientes = await Clientes.findAll({
      where: {
        nome: { [Op.like]: `%${consulta}%` },
      },
      limit: resultadoPorBusca,
      offset: (pagina - 1) * resultadoPorBusca,
    });

    res.render("adm/clientes-adm", {
      consulta,
      clientes,
      pagina,
      resultadoPorBusca,
      ultimoNumero,
      primeiroNumero,
      totalDePaginas,
    });
  },
  showResultadoAdminsAdm: async (req, res) => {
    const consulta =
      req.query.pesquisar === undefined ? "" : req.query.pesquisar;

    const resultadoPorBusca =
      req.query.resPorBusca === undefined ? 10 : Number(req.query.resPorBusca);

    const pagina =
      req.query.pagina === undefined ? 1 : Number(req.query.pagina);

    const numAdms = await Administradores.count({
      where: {
        nome: { [Op.like]: `%${consulta}%` },
      },
    });

    const totalDePaginas = Math.ceil(numAdms / resultadoPorBusca);

    const nMaxPaginas = 5;

    let primeiroNumero = pagina - Math.floor(nMaxPaginas / 2);

    let ultimoNumero = pagina + Math.floor(nMaxPaginas / 2);

    if (primeiroNumero < 1) {
      primeiroNumero = 1;
    }

    if (ultimoNumero > totalDePaginas) {
      ultimoNumero = totalDePaginas;
    }

    const adms = await Administradores.findAll({
      where: {
        nome: { [Op.like]: `%${consulta}%` },
      },
      limit: resultadoPorBusca,
      offset: (pagina - 1) * resultadoPorBusca,
    });

    res.render("adm/admins-adm", {
      consulta,
      adms,
      pagina,
      resultadoPorBusca,
      ultimoNumero,
      primeiroNumero,
      totalDePaginas,
    });
  },
  showResultadoCategoriasAdm: async (req, res) => {
    const consulta =
      req.query.pesquisar === undefined ? "" : req.query.pesquisar;

    const resultadoPorBusca =
      req.query.resPorBusca === undefined ? 10 : Number(req.query.resPorBusca);

    const pagina =
      req.query.pagina === undefined ? 1 : Number(req.query.pagina);

    const numCategorias = await Clientes.count({
      where: {
        nome: { [Op.like]: `%${consulta}%` },
      },
    });

    const totalDePaginas = Math.ceil(numCategorias / resultadoPorBusca);

    const nMaxPaginas = 5;

    let primeiroNumero = pagina - Math.floor(nMaxPaginas / 2);

    let ultimoNumero = pagina + Math.floor(nMaxPaginas / 2);

    if (primeiroNumero < 1) {
      primeiroNumero = 1;
    }

    if (ultimoNumero > totalDePaginas) {
      ultimoNumero = totalDePaginas;
    }

    const categorias = await Categorias.findAll({
      where: {
        nome: { [Op.like]: `%${consulta}%` },
      },
      limit: resultadoPorBusca,
      offset: (pagina - 1) * resultadoPorBusca,
    });

    res.render("adm/categorias-adm", {
      consulta,
      categorias,
      pagina,
      resultadoPorBusca,
      ultimoNumero,
      primeiroNumero,
    });
  },
  showCadastrarProdutosAdm: async (req, res) => {

    const fornecedor = await Fornecedores.findAll()
    const categoria = await Categorias.findAll()
    res.render("adm/forms/form-add-produto.ejs", {fornecedor,categoria});
  },
  showCadastrarCategoriaAdm: (req, res) => {
    res.render("adm/forms/form-add-categoria");
  },
  showCadastrarAdminAdm: async (req, res) => {
    res.render("adm/forms/form-add-adm");
  },
  showEditCategoriaAdm: async (req, res) => {
    const categoria = await Categorias.findOne({where:{id:req.params.id}})
    res.render("adm/forms/form-edit-categoria", {categoria:categoria});
  },
  showEditClienteAdm: async (req, res) => {
    res.render("adm/forms/form-edit-cliente");
  },
  showEditPedidoAdm: async (req, res) => {
    res.render("adm/forms/form-edit-pedido");
  },
  showEditAdminAdm: async (req, res) => {
    res.render("adm/forms/form-edit-adm");
  },
  ShowEditProduto: async (req, res) => {
    let { id } = req.params;

    let produto = await Produtos.findAll({
      where: {
        id: id,
      },
    });

    produto = produto[0].toJSON();

    res.render("adm/forms/form-edit-produto", { prod: produto });
  },

  // ------------------------------------ POST/DELETE ------------------------------------------
  
  // ------- CRUD PRODUTO COMPLETO ------------
  showSalvarProdutosAdm: async (req, res) => {
    let produto = await Produtos.create({
      nome: req.body.nome,
      preco: req.body.preco,
      categoriaId: req.body.categoriaId,
      fornecedores_id:req.body.fornecedorId
    });

    // console.log(produto.toJSON());

    res.redirect("/produtos-adm");
  },
  deleteProduto: async (req,res)=>{
    await Produtos.destroy({where:{id:req.params.id}})
    res.redirect("/produtos-adm");
  },

  
  // ------- CRUD CATEGORIA COMPLETO ------------
  showSalvarCategoriaAdm: async (req,res)=>{
    let novaCategoria = await Categorias.create({nome:req.body.nome})
    res.redirect("/categorias-adm");
  },
  deleteCategoria: async (req,res)=>{
    await Categorias.destroy({where:{id:req.params.id}})
    res.redirect("/categorias-adm");
  },
  atualizarCategoria:async(req,res)=>{
    await Categorias.update({nome:req.body.nome},{where:{id:req.params.id}})
    res.redirect("/categorias-adm");
  },

  // ------- CRUD ADMIN COMPLETO ------------
  showSalvarAdminAdm: async(req,res)=>{
    try{
      let novoAdmin = await Administradores.create({
          nome:req.body.nome,
          telefone:req.body.telefone,
          email:req.body.email,
          senha:req.body.senha
  
      })

    }
    catch(e){
      console.error("Error")
    }
    res.redirect('/resultado-administradores-adm')
  },
  deleteAdmin:async(req,res)=>{
    await Administradores.destroy({where:{id:req.params.id}})
    res.redirect('/resultado-administradores-adm')

  },
  atualizarProduto: async (req, res) => {
    let id = req.params.id;

    await Produtos.update(
      {
        nome: req.body.nome,
        preco: req.body.preco,
        categoriaId: req.body.categorias,
      },
      { where: { id: id } }
    );

    res.redirect("/produtos-adm");
  },
  delete: (req, res) => {
    // let posicao = arraydb.findIndex(p => p.id == id);
    // // console.log(posicao)
    // arraydb.splice(posicao, 1)
    // salvaJson(arraydb)
    let { id } = req.params;
    delProduto(id, arraydb);
    res.redirect("/produtos-adm");
  },
  select: (req, res) => {
    let value = req.query.select || 10;
    let produtos = arraydb;
    res.render("adm/produtos-adm", { value, produtos });
  },
  teste: (req, res) => {
    res.render("display/teste.ejs");
  },
};

module.exports = admController;
