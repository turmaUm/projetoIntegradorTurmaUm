const Enderecos = require('./Enderecos')
const Clientes = require('./Clientes')
const FormasDePagamento = require('./FormasDePagamento')

module.exports = (sequelize, DataTypes) => {
    const Pedidos = sequelize.define('Pedidos', {
        enderecos_id: {
            type:DataTypes.INTEGER,
            allowNull: false
        },
        clientes_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        formas_de_pagamento_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'pedidos',
        paranoid: true
    })

    Pedidos.associate = models => {
        Produtos.belongsTo(models.Enderecos, {
            foreignKey: 'enderecos_id',
            as: 'enderecos'
        })
        Produtos.belongsTo(models.Clientes, {
            foreignKey: 'clientes_id',
            as: 'clientes'
        })
        Produtos.belongsTo(models.FormasDePagamento, {
            foreignKey: 'formas_de_pagamento_id',
            as: 'formas_de_pagamento'
        })
    }

        return Pedidos
}
