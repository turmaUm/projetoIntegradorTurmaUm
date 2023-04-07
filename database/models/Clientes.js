const Pedidos = require('./Pedidos')
const Enderecos = require('./Enderecos')
const Avaliacoes = require('./Avaliacoes')

module.exports = (sequelize, DataTypes) => {
    const Clientes = sequelize.define('Clientes', {
        nome: {
            type:DataTypes.STRING(120),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true
        },
        senha: {
            type: DataTypes.STRING(64),
            allowNull: false
        }
    }, {
        tableName: 'clientes',
        timestamps: true,
        paranoid: true
    })

    Clientes.associate(models => {
        Clientes.hasMany(models.Pedidos, {
            foreignKey: 'clientes_id',
            as: 'pedidos'
        })
        Clientes.hasMany(models.Enderecos, {
            foreignKey: 'clientes_id',
            as: 'enderecos'
        })
        Clientes.hasMany(models.Avaliacoes, {
            foreignKey: 'clientes_id',
            as: 'avaliacoes'
        })
    })

        return Clientes
}
