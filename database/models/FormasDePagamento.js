const Pedidos = require('./Pedidos')
const Clientes = require('./Clientes')


module.exports = (sequelize, DataTypes) => {
    const FormasDePagamento = sequelize.define('FormasDePagamento', {
        nome: {
            type:DataTypes.STRING(45),
            allowNull: false
        }
    }, {
        tableName: 'formas_de_pagamento',
        timestamps: false
    })

        return FormasDePagamento
}