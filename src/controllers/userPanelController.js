const clientes = require('../../db/clientes.json');

const userPanelController = {
    showCliente: (req, res) => {
        res.render('cliente')
    },
    showEditarPerfil: (req, res) => {
        // const id = req.params.id;
        const { id } = req.params
        const user = clientes.find( user => user.id == id)
        // console.log(user);

        res.render('editar-perfil', {user});
    }
}

module.exports = userPanelController;