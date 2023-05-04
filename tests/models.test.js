const { Cores, Tamanhos, Avaliacoes, Categorias, FormasDePagamento, Imagens, Ingredientes, Enderecos, Clientes, Produtos, Pedidos, ProdutosPedidos, Administradores, sequelize } = require('../database/models');

async function teste(){
    let clientes = await Clientes.findAll({include: "enderecos"});
    console.log(clientes.map(e => e.toJSON()));
    sequelize.close();
}

async function teste2(){
    let produtos = await Produtos.findAll({include: "tamanhos"});
    for(let i in produtos) {
        console.log(produtos[i].toJSON());
    }
    sequelize.close();
}

async function teste3(){
    let produtosPedidos = await ProdutosPedidos.findAll({
        raw: true
    });
    console.log(produtosPedidos);
}


teste2();