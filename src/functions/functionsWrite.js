const path = require('path');
const fs = require('fs');
const { db, sequelize } = require('../../database/models')

function avaliandoId(array, produto){
    if(array.length == 0){
        produto.id = 1
    }else{
        produto.id = array[array.length -1].id +1;
    }
}

function editProduto (id, array, reqbody){
    let produto=array.find(p=> p.id == id) // vc pega o valor do json que vc que modificar
    
    if(produto == undefined){
        throw new Error("Pizza inexistente");
    }

    produto.nome = reqbody.nome;
    produto.categoria = reqbody.categoria;
    produto.fornecedor = reqbody.fornecedor;
    produto.preco = reqbody.preco;
        
    salvaJson(array)
}
 function delProduto(id, array){
    let posicao = array.findIndex(p => p.id == id);
    if(posicao == -1){
        throw new Error("Pizza inexistente");
    }
    array.splice(posicao, 1)
    salvaJson(array)
 }


let produtoServices= {
    avaliandoId,
    editProduto,
    delProduto
}

module.exports = produtoServices;