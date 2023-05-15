const clientes = require('../../db/clientes.json');
const bcrypt = require('bcrypt'); 
const path = require('path')
const fs = require('fs');
const { Clientes, Administradores } = require('../../database/models'); // Usado desestruturação para importar o model cliente.
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
        if(user.length <= 0){
            // res.send('Nenhum usuario encontrado')
            return res.render('cliente/login', {error: "Falha no login!"})
        }else{
            const validaSenha = bcrypt.compareSync(senha, user[0].senha);
            if(!validaSenha){
               return res.render('cliente/login', {error: "Falha no login!"}) 
            }

            req.session.userLogado = true
            
            req.session.user = {
                id: user[0].id,
                nome:user[0].nome
            };
            res.redirect('/home')
        }
    },
    logout: (req,res) => {
        delete req.session.user
        res.redirect('/home');
    },
    logoutAdm: (req,res) => {
        delete req.session.adm;
        req.session.admLogado = false;
        res.redirect('/login-adm');
    },
    showLoginAdm: (req, res) => {
        res.render('adm/login-adm')
    },
    loginAdm: async (req, res) => {
        const { email, senha } = req.body
        const user = await Administradores.findAll({
            where: {
                email
            }
        })
        
        //Verificar se o usuário foi encontrado
        if(user.length <= 0){
            // res.send('Nenhum usuario encontrado')
            return res.render('adm/login-adm', {error: "Falha no login"})
        }else{
            const validaSenha = bcrypt.compareSync(senha, user[0].senha);
            if(!validaSenha){
               return res.render('adm/login-adm', {error: "Falha no login"}) 
            }

            req.session.admLogado = true;
            req.session.adm = user[0].nome;    
            res.redirect('/clientes-adm')
        }
    }
}

module.exports = loginController;