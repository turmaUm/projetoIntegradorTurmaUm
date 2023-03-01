const path = require('path');
const fs = require('fs');

function avaliandoId(array, produto){
    if(array.length == 0){
        produto.id = 1
    }else{
        produto.id = array[array.length -1].id +1;
    }
}


function salvaJson(array){
    const caminho = path.resolve(__dirname + "../../../db/produtos.json");
    fs.writeFileSync(caminho, JSON.stringify(array, null, 4));
}

function addProduto(array, produto){
    array.push(produto)
    salvaJson(array)
}



let produtoServices= {
    avaliandoId,
    addProduto,
    salvaJson,
}

module.exports = produtoServices;