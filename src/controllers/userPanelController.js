const clientes = require('../../db/clientes.json');
const bcrypt = require('bcrypt'); 
const fs = require('fs');
const path = require('path');

const userPanelController = {
    showCliente: (req, res) => {
        res.render('cliente/cliente')
    },
    showEditarPerfil: (req, res) => {
        // const id = req.params.id;
        const { id } = req.params
        const user = clientes.find( user => user.id == id)
        // console.log(user);

        res.render('cliente/editar-perfil', {user});
    },
    atualizarPerfil: (req,res) => {
        const { id } = req.params
        const user = clientes.find( user => user.id == id)
        let senhaComCriptografia = bcrypt.hashSync(req.body.nova_senha, 10); 
        //Se encontrar o usuario dentro do arquivo JSON, o 'if' faz a alteração de todos os campos, reescrevendo. 
        if(user != undefined){
            user.nome = req.body.nome
            user.email = req.body.email
            user.telefone = req.body.telefone
            user.enderecos.push(req.body.endereco)
            user.senha = senhaComCriptografia
        }
        // console.log(user);
        fs.writeFileSync(path.join(__dirname, '..', '..', 'db', 'clientes.json'), JSON.stringify(clientes, null, 4))
        res.render('cliente/editar-perfil', {user});
    }
}

module.exports = userPanelController;