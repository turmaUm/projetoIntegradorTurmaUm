const clientes = require('../../db/clientes.json');
const bcrypt = require('bcrypt'); 
const fs = require('fs');
const path = require('path');
const { Clientes } = require('../../database/models')

const userPanelController = {
    showCliente: (req, res) => {
        res.render('cliente/cliente')
    },
    showEditarPerfil: async (req, res) => {
        // const id = req.params.id;
        const { id } = req.params;
        const user = await Clientes.findByPk(id);
        console.log(user);
        res.render('cliente/editar-perfil', {user});
    },
    atualizarPerfil: async (req,res) => {
        const { id } = req.params
        let senhaComCriptografia = bcrypt.hashSync(req.body.novaSenha, 10); 
        const usuarioAtualizado = await Clientes.update({
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            senha: senhaComCriptografia
        }, {
            where: {
                id
            }
        });
  
        req.session.regenerate(function (err) {
            req.session.user = {
                id: parseInt(id),
                nome: req.body.nome,
            };
            return res.redirect(`/cliente/editar/${id}`);
        });
    }
}

module.exports = userPanelController;