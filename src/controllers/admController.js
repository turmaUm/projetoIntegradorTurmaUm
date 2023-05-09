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
const bcrypt = require("bcrypt");

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
const Avaliacoes = require("../../database/models/Avaliacoes");

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
    const editCliente = await Clientes.findOne({where:{id:req.params.id}},
      {include: [
        {model:Pedidos, as:'pedidos'},{model:Enderecos, as:'enderecos'}
        ,{model:Avaliacoes, as:'valiacoes'}
      ]})
    console.log(editCliente)  
    res.render("adm/forms/form-edit-cliente",{cliente:editCliente});
  },
  showEditPedidoAdm: async (req, res) => {
    res.render("adm/forms/form-edit-pedido");
  },
  showEditAdminAdm: async (req, res) => {
    const editAdmin = await Administradores.findOne({where:{id: req.params.id}})
    res.render("adm/forms/form-edit-adm", {editAdmin: editAdmin});
  },
  ShowEditProduto: async (req, res) => {
    

    let produto = await Produtos.findOne({where: {id: req.params.id}},
      {include: [{association:'categorias'},  // Isso daqui o apelido/alias  das ligações feitas no associate no modelo movie
      {association:'fornecedores'}]});
      let categorias = await Categorias.findAll()
      let fornecedores = await Fornecedores.findAll()
    // console.log(req.params.id)
    // console.log(produto)
    // produto = produto[0].toJSON();

    res.render("adm/forms/form-edit-produto", {produto, fornecedores, categorias });
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
  atualizarProduto: async (req, res) => {
    let id = req.params.id;

    await Produtos.update(
      {
        nome: req.body.nome,
        preco: req.body.preco,
        categoriaId: req.body.categorias,
        fornecedores_id:req.body.fornecedores
      },
      { where: { id: id } }
    );

    res.redirect("/resultado-produtos-adm'");
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

      let senhaCriptografada = bcrypt.hashSync(req.body.senha, 10);

      let novoAdmin = await Administradores.create({
          nome:req.body.nome,
          telefone:req.body.telefone,
          email:req.body.email,
          senha:senhaCriptografada
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
  atualizarAdmnistradores: async(req, res)=>{

    let senhaCriptografada = bcrypt.hashSync(req.body.senha, 10);

     await Administradores.update({
      nome:req.body.nome,
      email:req.body.email,
      senha:senhaCriptografada},
      {where:{id:req.params.id}})

      res.redirect('/resultado-administradores-adm')

  },

  //-------------- UD CLIENTE --------------
  deleteCliente: async (req,res) => {
    await Clientes.destroy({where:{id:req.params.id}})
    res.redirect('/resultado-clientes-adm')

  },
  atualizarCliente:async(req,res)=>{
    await Clientes.update({
      nome:req.body.nome,
      telefone:req.body.telefone,
      email:req.body.email
    },{where:{id:req.params.id}})
    
    res.redirect('/resultado-clientes-adm')
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
