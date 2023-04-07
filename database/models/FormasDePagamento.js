const Pedidos = require('./Pedidos')

module.exports = (sequelize, DataTypes) => {
    const FormasDePagamento = sequelize.define('FormasDePagamento', {
        nome: {
            type:DataTypes.STRING(45),
            allowNull: false
        }
    }, {
        tableName: 'formas_de_pagamento'
    })

    FormasDePagamento.associate(models => {
        Clientes.hasMany(models.FormasDePagamento, {
            foreignKey: 'formas_de_pagamento_id',
            as: 'formas_de_pagamento'
        })
    })

        return FormasDePagamento
}