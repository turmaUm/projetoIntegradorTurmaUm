const { Avaliacoes, Categorias, FormasDePagamento, Imagens, Ingredientes, Enderecos, Clientes, Produtos, Pedidos, ProdutosPedidos, sequelize } = require('../database/models');

async function teste(){
    let clientes = await Clientes.findAll({include: "enderecos"});
    console.log(clientes.map(e => e.toJSON()));
    sequelize.close();
}

async function teste2(){
    let clientes = await Clientes.findAll({include: "enderecos"});
    for(let i in clientes) {
        console.log(clientes[i].toJSON());
    }
    sequelize.close();
}

async function teste3(){
    let clientes = await Clientes.findAll({
        raw:true
    });
    console.log(clientes);
}


teste2();