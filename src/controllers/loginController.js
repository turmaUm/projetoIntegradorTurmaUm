const clientes = require('../../db/clientes.json');
const bcrypt = require('bcrypt'); 
const path = require('path')
const fs = require('fs');

const loginController = {
    showLogin: (req, res) => {
        res.render('login')
    },
    userRegister: (req, res) => {
        //Primeira forma: forma longa
        // const nome = req.body.nome
        // const email = req.body.email
        // const senha = req.body.senha

        //Segunda forma, usando desestruturação: forma curta
        const { nome, email, senha } = req.body
        
        //Dúvidas para o próximo colearning:
        //Entra id na const newUser?
        //Como transformar o campo senha em senhaCriptografada sem alterar o nome 'senha' na desestruturação
        //Duvida para preencher os parametros do campo bcrypt
        
        let senhaCriptografada = bcrypt.hashSync(senha, 10); //Para criptografar a senha
        let novoId = 1;
        
        if(clientes.length > 0){
            novoId = clientes[clientes.length -1].id + 1;
        }

        const newUser = { 
            id: novoId,
            nome: nome,
            email: email,
            senha: senhaCriptografada
        }

        clientes.push(newUser);
        fs.writeFileSync(path.join(__dirname, '..', '..', 'db', 'clientes.json'), JSON.stringify(clientes, null, 4))
        res.redirect('/home')
    }
}

module.exports = loginController;