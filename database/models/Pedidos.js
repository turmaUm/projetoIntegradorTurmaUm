const Enderecos = require('./Enderecos')
const Clientes = require('./Clientes')
const FormasDePagamento = require('./FormasDePagamento')

module.exports = (sequelize, DataTypes) => {
    const Pedidos = sequelize.define('Pedidos', {
        enderecos_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        clientes_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        formas_de_pagamento_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pagoAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        entregueAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'pedidos',
        timestamps: true,
        paranoid: true
    })

    Pedidos.associate = models => {
        Pedidos.belongsTo(models.Enderecos, {
            foreignKey: 'enderecos_id',
            as: 'enderecos'
        })
        Pedidos.belongsTo(models.Clientes, {
            foreignKey: 'clientes_id',
            as: 'clientes'
        })
        Pedidos.belongsTo(models.FormasDePagamento, {
            foreignKey: 'formas_de_pagamento_id',
            as: 'formas_de_pagamento'
        })
        Pedidos.belongsToMany(models.Produtos, {
            as: 'produtos',
            through: 'produtos_pedidos',
            foreignKey: 'pedidos_id',
            otherKey: 'produtos_id',
            timestamps: false
        })
    }

    return Pedidos
}
