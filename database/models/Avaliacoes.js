const Clientes = require('./Clientes')
const Produtos = require('./Produtos')

module.exports = (sequelize, DataTypes) => {
    const Avaliacoes = sequelize.define('Avaliacoes', {
        clientes_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        produtos_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nota: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        texto: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'avaliacoes',
        paranoid: true
    })

    Avaliacoes.associate(models => {
        Avaliacoes.belongsTo(models.Clientes, {
            foreignKey: 'clientes_id',
            as: 'cliente'
        })
        Avaliacoes.belongsTo(models.Produtos, {
            foreignKey: 'produtos_id',
            as: 'produto'
        })
    })

    return Avaliacoes
}
