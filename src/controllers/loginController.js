const clientes = require('../../db/clientes.json');
const bcrypt = require('bcrypt'); 
const path = require('path')
const fs = require('fs');
const { Clientes } = require('../../database/models'); // Usado desestruturação para importar o model cliente.
// Na linha 07, foi apresentado uma outra forma de importar o model 'cliente'
// const Clientes = require('../../database/models/Clientes');

const loginController = {
    showLogin: (req, res) => {
        res.render('cliente/login')
    },
    userRegister: async (req, res) => {
        //Primeira forma: forma longa
        // const nome = req.body.nome
        // const email = req.body.email
        // const senha = req.body.senha

        //Segunda forma, usando desestruturação: forma curta
        const { nome, email, senha } = req.body
        
        let senhaCriptografada = bcrypt.hashSync(senha, 10); //Para criptografar a senha
        
        const newUser = await Clientes.create(
            { 
                nome,
                email,
                senha: senhaCriptografada
            }); 

        res.redirect('/home')
    },
    login: async (req, res) => {
        const { email, senha } = req.body
        const user = await Clientes.findAll({
            where: {
                email
            }
        })
        //Verificar se o usuário foi encontrado
        if(user === undefined){
            res.render('/login', {error: "Falha no login"})
        }
        const validaSenha = bcrypt.compareSync(senha, user.senha);
        if(!validaSenha){
            res.send('Falha no login')
        }
        req.session.user = user.nome
        res.redirect('/home')
    },
    logout: (req,res) => {
        delete req.session.user
        res.redirect('/home');
    }
}

module.exports = loginController;