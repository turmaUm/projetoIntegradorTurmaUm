const Produtos = require('./Produtos')
const Pedidos = require('./Pedidos')

module.exports = (sequelize, DataTypes) => {
    const ProdutosPedidos = sequelize.define('ProdutosPedidos', {
        pedidos_id: {
            type:DataTypes.INTEGER,
            allowNull: false
        },
        produtos_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantidade: {
            type: DataTypes.DECIMAL(5,2),
            allowNull: false
        }
    }, {
        tableName: 'produtos_pedidos',
        paranoid: true
    })

    ProdutosPedidos.associate(models => {
        
    })

        return ProdutosPedidos
}

