const Categorias = require('./Categorias')
const Avaliacoes = require('./Avaliacoes')
const Imagens = require('./Imagens')
const Pedidos = require('./Pedidos')

module.exports = (sequelize, DataTypes) => {
    const Produtos = sequelize.define('Produtos', {
        nome: {
            type:DataTypes.STRING(45),
            allowNull: false
        },
        preco: {
            type: DataTypes.DECIMAL(9,2),
            allowNull: false
        },
        categorias_id: DataTypes.INTEGER
    }, {
        tableName: 'produtos',
        paranoid: true
    })

        Produtos.associate = models => {
            Produtos.belongsTo(models.Categorias, {
                foreignKey: 'categorias_id',
                as: 'categorias'
            })
            Produtos.hasMany(models.Avaliacoes, {
                foreignKey: 'produtos_id',
                as: 'produtos'
            })
            Produtos.hasMany(models.Imagens, {
                foreignKey: 'imagens_id',
                as: 'imagens'
            })
            Produtos.belongsToMany(models.Pedidos, {
                as: 'pedidos',
                through: 'produtos_pedidos',
                foreignKey: 'produtos_id',
                otherKey: 'pedidos_id',
                timestamps: false
            })
        }

        return Produtos
}
