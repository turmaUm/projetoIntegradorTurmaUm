const Categorias = require('./Categorias')
const Avaliacoes = require('./Avaliacoes')
const Imagens = require('./Imagens')
const Pedidos = require('./Pedidos')
const Fornecedores = require('./Fornecedores')

module.exports = (sequelize, DataTypes) => {
    const Produtos = sequelize.define('Produtos', {
        nome: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        preco: {
            type: DataTypes.DECIMAL(9, 2),
            allowNull: true
        },
        categoriaId: {
            type: DataTypes.INTEGER,
            allownull: false
        },
        fornecedores_id: {
            type: DataTypes.INTEGER,
            allownull: false
        }
    }, {
        tableName: 'produtos',
        timestamps: false
    })

    Produtos.associate = models => {
        Produtos.belongsTo(models.Categorias, {
            foreignKey: 'categoriaId',
            as: 'categorias'
        })
        Produtos.hasOne(models.Avaliacoes, {
            foreignKey: 'produtos_id',
            as: 'avaliacoes'
        })
        Produtos.belongsTo(models.Fornecedores, {
            foreignKey: 'fornecedores_id',
            as: 'fornecedores'
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
