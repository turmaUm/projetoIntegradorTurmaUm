const Pedidos = require('./Pedidos')
const Clientes = require('./Clientes')

module.exports = (sequelize, DataTypes) => {
    const Enderecos = sequelize.define('Enderecos', {
        clientes_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bairro: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        logradouro: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        numero: {
            type: DataTypes.STRING(5),
            allowNull: true
        },
        cidade: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        CEP: {
            type: DataTypes.STRING(8),
            allowNull: true
        }
    }, {
        tableName: 'enderecos',
        timestamps: false
    })

    Enderecos.associate(models => {
        Enderecos.hasMany(models.Pedidos, {
            foreignKey: 'enderecos_id',
            as: 'pedidos'
        })
        Enderecos.belongsTo(models.Clientes, {
            foreignKey: 'clientes_id',
            as: 'cliente'
        })
    })

    return Enderecos
}

